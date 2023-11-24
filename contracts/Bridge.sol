pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Bridge is Ownable {
    address public token;
    event Deposit(address by, uint256 amount);

    constructor(address _token) Ownable(msg.sender) {
        token = _token;
    }

    function deposit(uint256 _amount) public {
        IERC20(token).transferFrom(msg.sender, address(this), _amount);
        emit Deposit(msg.sender, _amount);
    }

    function release(address _to, uint256 _amount) public onlyOwner {
        IERC20(token).transfer(_to, _amount);
    }
}