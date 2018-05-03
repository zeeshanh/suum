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
    ownerCollectibleCount[_from] = ownerCollectibleCount[msg.sender].sub(1);
    collectibleToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    _transfer(msg.sender, _to, _tokenId);
  }

  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    collectibleApproval[_tokenId] = _to;
    emit Approval(msg.sender, _to, _tokenId);
  }

  function takeOwnership(uint256 _tokenId) public {
    require(collectibleApproval[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }

  function buyCollectible(uint256 _tokenId) public payable returns (bool){
    require(msg.value >= collectibles[_tokenId].price);
    address oldOwner = ownerOf(_tokenId);
    _transfer(oldOwner, msg.sender, _tokenId);
    oldOwner.transfer(msg.value/10*8);
    creators[_tokenId].transfer(msg.value/10);
    return true;

  }
  
  function setPrice(uint256 _tokenId, uint price) public onlyOwnerOf(_tokenId) {
      collectibles[_tokenId].price = price; 
  }
 
 function gift(uint256 _tokenId, address _to) public onlyOwnerOf(_tokenId){
     _transfer(msg.sender, _to, _tokenId);
 }

 function destroy(uint256 _tokenId) public onlyOwnerOf(_tokenId){
    delete collectibles[_tokenId];
 }

}
