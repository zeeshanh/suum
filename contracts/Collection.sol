pragma solidity ^0.4.18;

contract Collection{

	struct Collectible{
		string name;
		string desc;
		string collectibleImage;
		// this can be a link to a video, song, etc.
		string collectibleExtraContent;
		uint price;

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

    function _createCol(string name, string desc, string collectibleImage, string collectibleExtraContent, uint price) public {
    	uint id = collectibles.push(Collectible(name, desc, collectibleImage, price));
			creators[id] = msg.sender;
    	collectibleToOwner[id] = msg.sender;
      ownerCollectibleCount[msg.sender]++;
    }

    function getCol() public view returns (uint) {
    	return state;
    }

		function getCollectiblesLength() returns(uint) {
			return collectibles.length;
		}

		function getCollectibleByIndex(uint _collectibleIndex) public view returns (string, string, string, string, uint) {
			return (collectibles[_collectibleIndex].name, collectibles[_collectibleIndex].desc, collectibles[_collectibleIndex].collectibleImage, collectibles[_collectibleIndex].collectibleExtraContent, collectibles[_collectibleIndex].price);
		}

}
