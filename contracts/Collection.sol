pragma solidity ^0.4.18;

import "./Ownable.sol";
contract Collection is Ownable{

	uint idCounter = 0;

	struct Collectible{
		uint id;
		string name;
		string desc;
		string collectibleImage;
		// this can be a link to a video, song, etc.
		string collectibleExtraContent;
		uint price;
        uint quantity;
        string creator;
	}

	modifier onlyOwnerOf(uint _collectibleId) {
		require(msg.sender == collectibleToOwner[_collectibleId]);
		_;
	}

	Collectible[] public collectibles;

	mapping (uint => address) public creators;
    mapping (uint => address) public collectibleToOwner;
    mapping (address => uint) ownerCollectibleCount;
    mapping (uint => string) public creatorName;
    mapping(uint => Collectible) public Collectibles;

    function _createCol(string name, string desc, string collectibleImage, string collectibleExtraContent, uint price, uint quantity, string creator) public {
	uint _id = idCounter;
    collectibles.push(Collectible(_id, name, desc, collectibleImage, collectibleExtraContent, price, quantity, creator));
	creators[_id] = msg.sender;
	creatorName[_id] = creator;
    collectibleToOwner[_id] = msg.sender;
    ownerCollectibleCount[msg.sender]++;
    idCounter++;
  }

	function getCollectiblesLength() public view returns(uint length){
		return collectibles.length;
	}

	function getCollectibleByIndex(uint _collectibleIndex) public view returns (uint, string name, string, string, string, uint, address, uint, string){
        uint _id = collectibles[_collectibleIndex].id;
		return (_id, collectibles[_id].name, collectibles[_id].desc, collectibles[_id].collectibleImage, collectibles[_id].collectibleExtraContent, collectibles[_id].price, collectibleToOwner[_id], collectibles[_id].quantity, collectibles[_id].creator);
	}
	
	function withdraw() external onlyOwner{
	    owner.transfer(address(this).balance);
	}
	
	function getBalanceContract() public constant returns(uint){
        return address(this).balance;
    }
	
}
