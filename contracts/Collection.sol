pragma solidity ^0.4.18;

contract Collection{

	struct Collectible{
		string name;
		string desc;
		string collectibleImage;
		string collectibleVideo;
		string collectibleSong;
		uint price;

	}

	modifier onlyOwnerOf(uint _collectibleId) {
		require(msg.sender == collectibleToOwner[_collectibleId]);
		_;
	}

	Collectible[] public collectibles;

	mapping (uint => Collectible) public Collectibles;
    mapping (uint => address) public collectibleToOwner;
    mapping (address => uint) ownerCollectibleCount;

    function _createCol(string name, string desc, uint price, string collectibleImage) public{
    	uint id = collectibles.push(Collectible(name, desc, collectibleImage, price));
    	collectibleToOwner[id] = msg.sender;
      ownerCollectibleCount[msg.sender]++;
    }

    function getCol() public view returns (uint) {
    	return state;
    }

}
