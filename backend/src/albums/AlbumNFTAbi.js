"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlbumNFTAbi = [
    // Define the ABI for the AlbumNFT contract here
    {
        "constant": false,
        "inputs": [
            {
                "name": "ipfsUri",
                "type": "string"
            },
            {
                "name": "trackTokenIds",
                "type": "uint256[]"
            },
            {
                "name": "price",
                "type": "uint256"
            },
            {
                "name": "royaltyFee",
                "type": "uint256"
            }
        ],
        "name": "mintAlbum",
        "outputs": [
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "purchaseAlbum",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdrawRoyalties",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "ipfsUri",
                "type": "string"
            }
        ],
        "name": "AlbumMinted",
        "type": "event"
    }
];
exports.default = AlbumNFTAbi;
