pragma solidity ^0.4.18;

contract Collection{

	struct Collectible{
		string name;
		string desc;
		string imgLink;
		uint price;

	}

	modifier onlyOwnerOf(uint _collectibleId) {
		require(msg.sender == collectibleToOwner[_collectibleId]);
		_;
	}

	Collectible[] public colls;

	uint public state;
	mapping (uint => Collectible) public Collectibles;
    mapping (uint => address) public collectibleToOwner;
    mapping (address => uint) ownerCollectibleCount;

    function _createCol(string name, string desc, uint price, string imgLink) public{
    	state++;
    	uint id = colls.push(Collectible(name, desc, imgLink, price));
    	collectibleToOwner[id] = msg.sender;
        ownerCollectibleCount[msg.sender]++;
    }

    function getCol() public view returns (uint) {
    	return state;
    }

}
