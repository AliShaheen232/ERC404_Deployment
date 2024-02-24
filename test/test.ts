import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import { New404 } from '../typechain-types'

describe('New404', function () {
    let New404: New404
    let owner: SignerWithAddress
    let addr1: SignerWithAddress
    let addr2: SignerWithAddress

    beforeEach(async function () {
        // Get signers
        ;[owner, addr1, addr2] = await ethers.getSigners()

        // Deploy the New404 contract
        New404 = await ethers.deployContract('New404', [owner.address], owner)
    })

    it('Should set the right owner', async function () {
        expect(await New404.owner()).to.equal(owner.address)
    })

    it('Should update baseTokenURI', async function () {
        const newURI = 'ipfs://newBaseURI/'
        await New404.connect(owner).setTokenURI(newURI)
        expect(await New404.baseTokenURI()).to.equal(newURI)
    })

    it('Should revert when non-owner tries to set baseTokenURI', async function () {
        const newURI = 'ipfs://newBaseURI/'
        await expect(
            New404.connect(addr1).setTokenURI(newURI)
        ).to.be.revertedWithCustomError(New404, 'Unauthorized')
    })

    it('Should update dataURI', async function () {
        const newDataURI = 'ipfs://newDataURI/'
        await New404.connect(owner).setDataURI(newDataURI)
        expect(await New404.dataURI()).to.equal(newDataURI)
    })

    it('Should revert when non-owner tries to set dataURI', async function () {
        const newDataURI = 'ipfs://newDataURI/'
        await expect(
            New404.connect(addr1).setDataURI(newDataURI)
        ).to.be.revertedWithCustomError(New404, 'Unauthorized')
    })

    it('Should update name and symbol', async function () {
        const newName = 'NewName'
        const newSymbol = 'NN'
        await New404.connect(owner).setNameSymbol(newName, newSymbol)
        expect(await New404.name()).to.equal(newName)
        expect(await New404.symbol()).to.equal(newSymbol)
    })

    it('Should revert when non-owner tries to set name and symbol', async function () {
        const newName = 'NewName'
        const newSymbol = 'NN'
        await expect(
            New404.connect(addr1).setNameSymbol(newName, newSymbol)
        ).to.be.revertedWithCustomError(New404, 'Unauthorized')
    })

    it('Should return the correct tokenURI', async function () {
        const baseTokenURI = 'ipfs://baseTokenURI/'
        await New404.connect(owner).setTokenURI(baseTokenURI)
        const tokenId = 1 // Example token ID
        expect(await New404.tokenURI(tokenId)).to.equal(baseTokenURI)
    })
})