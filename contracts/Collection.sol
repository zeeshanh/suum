pragma solidity ^0.4.18;

contract Collection{

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
	}

	modifier onlyOwnerOf(uint _collectibleId) {
		require(msg.sender == collectibleToOwner[_collectibleId]);
		_;
	}

	Collectible[] public collectibles;

	mapping (uint => address) public creators;
	mapping (uint => Collectible) public Collectibles;
    mapping (uint => address) public collectibleToOwner;
    mapping (address => uint) ownerCollectibleCount;

    function _createCol(string name, string desc, string collectibleImage, string collectibleExtraContent, uint price, uint quantity) public {
	uint _id = idCounter;
    collectibles.push(Collectible(_id, name, desc, collectibleImage, collectibleExtraContent, price, quantity));
	creators[_id] = msg.sender;
    collectibleToOwner[_id] = msg.sender;
    ownerCollectibleCount[msg.sender]++;
    idCounter++;
  }

	function getCollectiblesLength() public view returns(uint length){
		return collectibles.length;
	}

	function getCollectibleByIndex(uint _collectibleIndex) public view returns (uint, string name, string, string, string, uint, address){
        uint _id = collectibles[_collectibleIndex].id;
		return (collectibles[_collectibleIndex].id, collectibles[_collectibleIndex].name, collectibles[_collectibleIndex].desc, collectibles[_collectibleIndex].collectibleImage, collectibles[_collectibleIndex].collectibleExtraContent, collectibles[_collectibleIndex].price, collectibleToOwner[_id]);
	}

}
