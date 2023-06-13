// SPDX-License-Identifier: BLANK

// pragma
pragma solidity ^0.8.9;

// imports
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// error codes
error MrkplcResale__NotDeployer();

// Interfaces

// Libraries

// Contracts

/// @title RegenWise NFT Marketplace Con
/// @author keenregen
contract RWiseNftMrkplc is IERC721Receiver, ReentrancyGuard, Ownable {

    // mrkplc deployer
    address payable deployer;
    // nft contract addr (Mumbai Testnet Address of nft contract = 0xA6A3A5C121B30F6D51Da4d907D711bc181952531)
    ERC721Enumerable nft;
    uint256 listingFee = 1000000000000000; // 0.001 MATIC

    struct List {
        uint256 tokenId;
        address payable seller;
        address payable holder;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => List) public fairItems;

    event NftListed(
        uint256 indexed tokenId,
        address seller,
        address holder,
        uint256 price,
        bool sold
    );

    function getListingFee() public view returns (uint256) {
    return listingFee;
    }

    // Constructor
    // called when the contract is deployed
    constructor(ERC721Enumerable _nft) {
    deployer = payable(msg.sender);
    nft = _nft;
    }

    // Modifiers

    modifier onlyDeployer() {
        // require(msg.sender == deployer, "Sender must be contract deployer.");
        // gas efficient way for errors
        if (msg.sender != deployer) revert MrkplcResale__NotDeployer();
        _;
    }

    // Functions (const, rec, fallback, external, public, internal, private, view/pure)

    function withdraw() public payable onlyDeployer {
        require(payable(msg.sender).send(address(this).balance));
    }

    function listSale(
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(nft.ownerOf(tokenId) == msg.sender, "Nft is not yours");
        require(price > 0, "Price must be higher than 0");
        if (msg.sender != deployer) {
        require(
            msg.value == listingFee,
            "Please transfer 0.01 MATIC to pay listing fee"
        );}
        nft.transferFrom(msg.sender, address(this), tokenId);
        fairItems[tokenId] = List(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        emit NftListed(tokenId, msg.sender, address(this), price, false);
    }

    function buyNft(uint256 tokenId) public payable nonReentrant {
        uint256 price = fairItems[tokenId].price;
        require(
            msg.value == price,
            "Transfer price amount to complete transaction"
        );
        fairItems[tokenId].seller.transfer(msg.value);
        nft.transferFrom(address(this), msg.sender, tokenId);
        fairItems[tokenId].sold = true;
        delete fairItems[tokenId];
    }

    function cancelSale(uint256 tokenId) public nonReentrant {
        require(fairItems[tokenId].seller == msg.sender, "NFT is not yours");
        nft.transferFrom(address(this), msg.sender, tokenId);
        delete fairItems[tokenId];
    }

    function getPrice(uint256 tokenId) public view returns (uint256) {
        uint256 price = fairItems[tokenId].price;
        return price;
    }

    function nftListings() public view returns (List[] memory) {
        uint256 nftCount = nft.totalSupply();
        uint currentIndex = 0;
        List[] memory items = new List[](nftCount);
        for (uint i = 0; i < nftCount; i++) {
            if (fairItems[i].holder == address(this)) {
                List storage currentItem = fairItems[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function onERC721Received(
        address,
        address from,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        require(from == address(0x0), "Cannot send nfts to nftFair directly");
        return IERC721Receiver.onERC721Received.selector;
    }

}