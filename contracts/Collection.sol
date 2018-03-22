pragma solidity ^0.4.18;

contract Collection{

	struct Collectible{
		string name;
		string desc;
		string imgLink;
		uint price;

	}

	Collectible[] public colls;

	uint public state;
	mapping (uint => Collectible) public Collectibles;
    mapping (uint => address) public colToOwner;
    mapping (address => uint) ownerColCount;

    function _createCol(string name, string desc, uint price, string imgLink) public{
    	state++;
    	uint id = colls.push(Collectible(name, desc, imgLink, price));
    	colToOwner[id] = msg.sender;
        ownerColCount[msg.sender]++;
    }

    function getCol() public view returns (uint) {
    	return state;
    }

}



