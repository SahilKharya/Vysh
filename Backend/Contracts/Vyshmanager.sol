// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// import "./Vysh.sol";
import "./VyshCert.sol";
import "./VyshData.sol";


contract VyshMana {

    // Vysh public token;
    VyshData public nft;
    VyshCert public cert;

    address owner;
    mapping (uint256 => address) public certToOwner;
    mapping (uint256 => address) public nftToOwner;

    event minted(uint256 certTokenId, uint256 nftTokenId);

    constructor(address _nft, address _cert){
        // token = Vysh(_token);
        nft = VyshData(_nft);
        cert = VyshCert(_cert);
        owner = msg.sender;
    }

    function getNFTOwner(uint256 _tokenId ) public view returns (address){
        return nftToOwner[_tokenId];
    }

    function getCertOwner(uint256 _tokenId ) public view returns (address){
        return certToOwner[_tokenId];
    }

    function mintNFT(address _to) public returns (uint256, uint256){

        // uint256 nftTokenId = nft.mint(_to, tokenURI);
        uint256 certTokenId = cert.mint(msg.sender);

        // nftToOwner[nftTokenId] = _to;
        certToOwner[certTokenId] = _to;

        emit minted(certTokenId,certTokenId);
        return (certTokenId, certTokenId);
    }
}