// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.17;

import { PermissionLib } from "@aragon/osx/core/permission/PermissionLib.sol";
import { PluginSetup, IPluginSetup } from "@aragon/osx/framework/plugin/setup/PluginSetup.sol";
import { VaultPlugin } from "./VaultPlugin.sol";
import {
    ERC4626Upgradeable,
    ERC20Upgradeable,
    IERC20MetadataUpgradeable,
    SafeERC20Upgradeable,
    IERC20Upgradeable
} from "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol";

/// @title VaultPluginSetup build 1
contract VaultPluginSetup is PluginSetup {
    address private immutable IMPLEMEMTATION;

    constructor() {
        IMPLEMEMTATION = address(new VaultPlugin());
    }

    /// @inheritdoc IPluginSetup
    function prepareInstallation(
        address _dao,
        bytes memory _data
    )
        external
        returns (address plugin, PreparedSetupData memory preparedSetupData)
    {
        address baseAsset = abi.decode(_data, (address));

        plugin =
            createERC1967Proxy(IMPLEMEMTATION, abi.encodeWithSelector(VaultPlugin.initialize.selector, _dao, baseAsset));

        PermissionLib.MultiTargetPermission[] memory permissions = new PermissionLib.MultiTargetPermission[](2);

        permissions[0] = PermissionLib.MultiTargetPermission({
            operation: PermissionLib.Operation.Grant,
            where: plugin,
            who: _dao,
            condition: PermissionLib.NO_CONDITION,
            permissionId: keccak256("TOGGLE_TRANSFER_PERMISSION")
        });

        permissions[1] = PermissionLib.MultiTargetPermission({
            operation: PermissionLib.Operation.Grant,
            where: _dao,
            who: plugin,
            condition: PermissionLib.NO_CONDITION,
            permissionId: keccak256("EXECUTE_PERMISSION")
        });

        preparedSetupData.permissions = permissions;
    }

    /// @inheritdoc IPluginSetup
    function prepareUninstallation(
        address _dao,
        SetupPayload calldata _payload
    )
        external
        pure
        returns (PermissionLib.MultiTargetPermission[] memory permissions)
    {
        permissions = new PermissionLib.MultiTargetPermission[](1);

        permissions[0] = PermissionLib.MultiTargetPermission({
            operation: PermissionLib.Operation.Revoke,
            where: _payload.plugin,
            who: _dao,
            condition: PermissionLib.NO_CONDITION,
            permissionId: keccak256("STORE_PERMISSION")
        });

        permissions[1] = PermissionLib.MultiTargetPermission({
            operation: PermissionLib.Operation.Revoke,
            where: _dao,
            who: _payload.plugin,
            condition: PermissionLib.NO_CONDITION,
            permissionId: keccak256("EXECUTE_PERMISSION")
        });
    }

    /// @inheritdoc IPluginSetup
    function implementation() external view returns (address) {
        return IMPLEMEMTATION;
    }
}
