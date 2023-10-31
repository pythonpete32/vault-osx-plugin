// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.21;

import { DAO } from "@aragon/osx/core/dao/DAO.sol";
import { DaoUnauthorized } from "@aragon/osx/core/utils/auth.sol";
import { PluginRepo } from "@aragon/osx/framework/plugin/repo/PluginRepo.sol";

import { AragonE2E } from "./base/AragonE2E.sol";
import { VaultPluginSetup } from "../src/VaultPluginSetup.sol";
import { VaultPlugin } from "../src/VaultPlugin.sol";
import { TestToken } from "./mocks/TestToken.sol";

contract VaultPluginE2E is AragonE2E {
    DAO internal dao;
    VaultPlugin internal plugin;
    PluginRepo internal repo;
    VaultPluginSetup internal setup;
    address internal usdc;
    address internal unauthorised = account("unauthorised");

    function setUp() public virtual override {
        super.setUp();
        setup = new VaultPluginSetup();
        usdc = address(new TestToken("USDC", "USDC"));

        address _plugin;

        (dao, repo, _plugin) = deployRepoAndDao("erc4620", address(setup), abi.encode(usdc));

        plugin = VaultPlugin(_plugin);
    }

    function test_e2e() public {
        // test repo
        PluginRepo.Version memory version = repo.getLatestVersion(repo.latestRelease());
        assertEq(version.pluginSetup, address(setup));
        assertEq(version.buildMetadata, NON_EMPTY_BYTES);

        // test dao
        assertEq(keccak256(bytes(dao.daoURI())), keccak256(bytes("https://mockDaoURL.com")));

        // test plugin init correctly
        assertEq(plugin.asset(), usdc);

        // test deposit
        TestToken(usdc).mint(address(this), 10 ether);
        TestToken(usdc).approve(address(plugin), 10 ether);
        plugin.deposit(10 ether, address(this));
        assertEq(plugin.totalAssets(), 10 ether);

        // test unauthorised cannot store number
        vm.prank(unauthorised);
        vm.expectRevert(
            abi.encodeWithSelector(
                DaoUnauthorized.selector, dao, plugin, unauthorised, keccak256("TOGGLE_TRANSFER_PERMISSION")
            )
        );
        plugin.toggleTransfers();
    }
}
