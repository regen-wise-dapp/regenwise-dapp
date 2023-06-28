// SPDX-License-Identifier: BLANK
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// auroraTnConAddr: 0x0614424Be6FeCA10C6Ce91B73f63E4B2Fe8BBc94
contract RWiseTreesZero is ERC721Enumerable, Ownable {
    using Strings for uint256;
    string public baseURI;
    uint256 public cost = 0.00001 ether;
    uint256 public maxSupply = 12;
    uint256 public maxMintAmount = 12;

    constructor() ERC721("RWiseTreesZero", "TREES") {}

    // internal

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://bafybeib4td5hynq72l2qlpbltck6xuvlhsc25fmgt7xequqtgtgimulxga/";
    }

    // public view

    function walletOfOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(abi.encodePacked(currentBaseURI, tokenId.toString()))
                : "";
    }

    // only owner

    function mint(address _to, uint256 _mintAmount) public payable onlyOwner{
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "Mint amount should be greater than 0.");
        require(_mintAmount <= maxMintAmount, "Max mint amount is 12.");
        require(
            supply + _mintAmount <= maxSupply,
            "Mint amount is greater than remaining NFTs."
        );

        if (msg.sender != owner()) {
            require(msg.value == cost * _mintAmount, "You should send 0.00001 ETH per Nft mint.");
        }

        for (uint256 i = 0; i < _mintAmount; i++) {
            _safeMint(_to, supply + i);
        }
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function withdraw() public payable onlyOwner {
        require(
            payable(msg.sender).send(address(this).balance),
            "There is a problem, it might be that you are not allowed."
        );
    }
}
