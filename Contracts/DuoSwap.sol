// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract DuoSwap {
    
    ISwapRouter public immutable swapRouter;

    address public constant BAA = 0x4Dc1051BAba988848D44265f463c0FC639708876;
    address public constant BAD = 0xD72270156cf97A8b177D7e84509856982261e646;
 
    uint24 public constant poolFee = 3000;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapExactInputSingle(uint256 amountIn) external returns (uint256 amountOut) {
        
        TransferHelper.safeTransferFrom(BAA, msg.sender, address(this), amountIn);

       
        TransferHelper.safeApprove(BAA, address(swapRouter), amountIn);

       
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: BAA,
                tokenOut: BAD,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

       
        amountOut = swapRouter.exactInputSingle(params);
    }

    
    function swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum) external returns (uint256 amountIn) {
        
        TransferHelper.safeTransferFrom(BAA, msg.sender, address(this), amountInMaximum);

        TransferHelper.safeApprove(BAA, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params =
            ISwapRouter.ExactOutputSingleParams({
                tokenIn: BAA,
                tokenOut: BAD,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

    
        amountIn = swapRouter.exactOutputSingle(params);
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(BAA, address(swapRouter), 0);
            TransferHelper.safeTransfer(BAA, msg.sender, amountInMaximum - amountIn);
        }
    }
}