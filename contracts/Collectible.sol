pragma solidity ^0.4.19;

import "./Collection.sol";
import "./ERC721.sol";
import "./safemath.sol";

/// TODO: Replace this with natspec descriptions
contract Collectible is Collection, ERC721 {

  using SafeMath for uint256;

  mapping (uint => address) collectibleApproval;

  function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerCollectibleCount[_owner];
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return collectibleToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerCollectibleCount[_to] = ownerCollectibleCount[_to].add(1);
    // test this line (typo in source code)
    ownerCollectibleCount[msg.sender] = ownerCollectibleCount[msg.sender].sub(1);
    collectibleToOwner[_tokenId] = _to;
    Transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    _transfer(msg.sender, _to, _tokenId);
  }

  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    collectibleApproval[_tokenId] = _to;
    Approval(msg.sender, _to, _tokenId);
  }

  function takeOwnership(uint256 _tokenId) public {
    require(collectibleApproval[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }
}
