// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract ProductRegistry {
    mapping(bytes32 => bool) private productHashes;

    event ProductAdded(bytes32 productHash);

    function addProduct(bytes32 productHash) public {
        require(!productHashes[productHash], "Product already exists");
        productHashes[productHash] = true;
        emit ProductAdded(productHash);
    }

    function bulkAddProducts(bytes32[] memory productHashesArray) public {
        for (uint256 i = 0; i < productHashesArray.length; i++) {
            bytes32 productHash = productHashesArray[i];
            if (!productHashes[productHash]) {
                productHashes[productHash] = true;
                emit ProductAdded(productHash);
            }
        }
    }

    function verifyProduct(bytes32 productHash) public view returns (bool) {
        return productHashes[productHash];
    }
}
