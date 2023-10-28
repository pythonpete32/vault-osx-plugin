// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.21;

import { console2 } from "forge-std/console2.sol";

import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";
import { DAO } from "@aragon/osx/core/dao/DAO.sol";
import { DAOMock } from "@aragon/osx/test/dao/DAOMock.sol";
import { IPluginSetup } from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import { DaoUnauthorized } from "@aragon/osx/core/utils/auth.sol";

import { AragonTest } from "./base/AragonTest.sol";

import { VaultPluginSetup } from "../src/VaultPluginSetup.sol";
import { VaultPlugin } from "../src/VaultPlugin.sol";
import { TestToken } from "./mocks/TestToken.sol";

import { IERC20MetadataUpgradeable } from
    "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";

abstract contract VaultPluginTest is AragonTest {
    DAO internal dao;
    VaultPlugin internal plugin;
    VaultPluginSetup internal setup;
    address internal usdc;

    function setUp() public virtual {
        setup = new VaultPluginSetup();
        usdc = address(new TestToken("USDC", "USDC"));
        bytes memory setupData = abi.encode(usdc);

        (DAO _dao, address _plugin) = createMockDaoWithPlugin(setup, setupData);

        dao = _dao;
        plugin = VaultPlugin(_plugin);
    }
}

contract VaultPluginInitializeTest is VaultPluginTest {
    function setUp() public override {
        super.setUp();
    }

    function test_initialize() public {
        assertEq(address(plugin.dao()), address(dao));
        assertEq(plugin.asset(), usdc);
    }

    function test_reverts_if_reinitialized() public {
        vm.expectRevert("Initializable: contract is already initialized");
        plugin.initialize(dao, IERC20MetadataUpgradeable(usdc));
    }
}

contract VaultPluginDepositTest is VaultPluginTest {
    function setUp() public override {
        super.setUp();
    }

    function test_deposit() public {
        TestToken(usdc).mint(address(this), 10 ether);
        TestToken(usdc).approve(address(plugin), 10 ether);
        plugin.deposit(10 ether, address(this));
        assertEq(plugin.totalAssets(), 10 ether);
    }

    function test_reverts_if_not_auth() public {
        // DaoUnauthorized({dao: address(_dao),where: _where,who: _who,permissionId: _permissionId});
        vm.expectRevert(
            abi.encodeWithSelector(
                DaoUnauthorized.selector, dao, plugin, address(this), keccak256("TOGGLE_TRANSFER_PERMISSION")
            )
        );

        plugin.toggleTransfers();
    }
}
