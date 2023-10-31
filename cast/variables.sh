## Wallet
call() {
    echo cast call
}

send() {
    echo cast send --private-key $PK
}

GOERLI() {
    echo --rpc-url $GOERLI_RPC
}

POW() {
        echo "$1 * 10^$2" | bc
}

## ERC20
BALANCE_OF="balanceOf(address)(uint256)"
ALLOWANCE="allowance(address,address)(uint256)"
TRANSFER="transfer(address,uint256)(bool)"
TRANSFER_FROM="transferFrom(address,address,uint256)(bool)"
APPROVE="approve(address,uint256)(bool)"
MINT="mint(address,uint256)(bool)"
BURN="burn(address,uint256)(bool)"
NAME="name()(string)"
SYMBOL="symbol()(string)"
DECIMALS="decimals()(uint8)"
TOTAL_SUPPLY="totalSupply()(uint256)"


## ERC4626
ASSET="asset()(address)"
TOTAL_ASSETS="totalAssets()(uint256)"
CONVERT_TO_SHARES="convertToShares(uint256)(uint256)"
CONVERT_TO_ASSETS="convertToAssets(uint256)(uint256)"
PREVIEW_DEPOSIT="previewDeposit(uint256)(uint256)"
DEPOSIT="deposit(uint256,address)(uint256)"
PREVIEW_REDEEM="previewRedeem(uint256)(uint256)"
REDEEM="redeem(uint256,address)(uint256)"
