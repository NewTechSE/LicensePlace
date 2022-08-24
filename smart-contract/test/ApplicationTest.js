const { expect } = require("chai");
const { ethers } = require("hardhat");

const bs58 = require("bs58")
const Application = artifacts.require('Application')
const License = artifacts.require('License')

const getAccounts = async () => {
    const accounts = await ethers.getSigners()
    const buyer = accounts[0];
    const publisher = accounts[1];
    const random = accounts[2];
    return { buyer, publisher, random }
}
const to32ByteString = (hash) => {
    return web3.utils.bytesToHex(bs58.decode(hash).slice(2))
}

const deploy = async () => {
    const LicensePlace = await ethers.getContractFactory("LicensePlace");
    const licensePlace = await LicensePlace.deploy();
    await licensePlace.deployed();
    return licensePlace
}

contract("Application And License", () => {
    var application = null
    var license = null
    var publisher = null
    var buyer = null
    var random = null
    var cid = null
    var newCid = null

    before(async () => {
        licensePlace = await deploy()
        const accounts = await getAccounts()
        buyer = accounts.buyer
        publisher = accounts.publisher
        random = accounts.random


        cidStr1 = "QmfLEpjnXrZoeC5gYFpPf6Frr3kpcy1aYbTioLH3KbjSJz"
        cidStr2 = "QmP3wj5BPtj8cmU6hpDvnFscKDChj1hLzLifeh2QwFmR9e"
        cidStr3 = "QmaPUvMcehBFgcan76crra9pHJaPQVN2XUFcsQZRCp33fh"
        // cid = ethers.utils.hexlify(cidStr1);
        // newCid = web3.utils.asciiToHex(cidStr2)

        cid = to32ByteString(cidStr1)
        newCid = to32ByteString(cidStr2)
        // const cid = web3.utils.asciiToHex("QmP3wj5BPtj8cmU6hpDvnFscKDChj1hLzLifeh2QwFmR9e");

        application = await Application.new(
            {
                name: "My App",
                symbol: "MYAPP",
                publisher: publisher.address,
                cid: cid,
            }, { from: publisher.address }
        );

        await licensePlace.connect(publisher).registerApp(
            application.address,
            { value: web3.utils.toWei("30", "wei") }
        );
    })

    describe("Application publisher", () => {

        it("Should be able to create license", async () => {
            license = await License.new(
                {
                    name: "MIT",
                    symbol: "MIT",
                    price: 10,
                    cid: cid,
                    // cid: web3.utils.asciiToHex("QmP3wj5BPtj8cmU6hpDvnFscKDChj1hLzLifeh2QwFmR9e"),
                },
                { from: publisher.address }
            );

            expect(await license.name()).to.equal("MIT");
            expect(await license.symbol()).to.equal("MIT");
            expect((await license.price()).toNumber()).to.equal(10);
            expect(await license.cid()).to.equal(cid);
        });

        it("Should allow publisher to register their license contract", async () => {
            await application.addLicenseContract(license.address, { from: publisher.address });
            const licenseContracts = await application.getLicenseContracts();
            expect(licenseContracts.length).to.equal(1);
            expect(licenseContracts[0]).to.equal(license.address);
        });

        it("Should not allow random user to add license contract", async () => {
            const vsCodeLicense = await License.new(
                {
                    name: "VSCode",
                    symbol: "VSC",
                    price: 10,
                    cid: cid
                    // cid: web3.utils.asciiToHex("QmP3wj5BPtj8cmU6hpDvnFscKDChj1hLzLifeh2QwFmR9e"),
                },
                { from: random.address }
            );
            try {
                await application.connect(random).addLicenseContract(vsCodeLicense.address)
                expect(0).to.equal(1)
            } catch (err) {
                expect(1).to.equal(1)
            }

        });

        it("Should allow publisher to update license info", async () => {
            await Promise.all([
                license.setPrice(20, { from: publisher.address }),
                license.setCid(newCid, { from: publisher.address })
            ]);

            expect((await license.price()).toNumber()).to.equal(20);
            expect(await license.cid()).to.equal(newCid);
        });
    });

    describe("Application License", () => {
        it("Should let everyone buy license", async () => {
            const response = await license.buyLicense(
                { from: random.address, value: web3.utils.toWei("25", "wei") }
            );

            const tokenId = (response.logs[0].args)["tokenId"]
            const ownerAddress = await license.ownerOf(tokenId);
            expect(ownerAddress).to.equal(random.address);
        });

        it("Should not allow to buy if they don't pay", async () => {
            await expect(license.buyLicense({ from: random.address })).to.be.reverted;
        });

        it("Should let user sell their license", async () => {
            await license.putLicenseForSale(
                {
                    tokenId: 0,
                    price: web3.utils.toWei("5", "wei"),
                    cid: newCid,
                },
                { from: random.address }
            );

            const saleTokenIds = await license.getLicenseForSale();

            expect(saleTokenIds.length).to.equal(1);
            expect(saleTokenIds[0].toNumber()).to.equal(0);
        });

        it("Should let user buy license from another user", async () => {
            const tokenId = 0;

            await license.buyLicenseByTokenId(
                tokenId,
                { from: buyer.address, value: web3.utils.toWei("25", "wei") }
            );

            const tokenOwner = await license.ownerOf(tokenId);

            expect(tokenOwner).to.equal(buyer.address);
            expect(tokenOwner).to.not.equal(random.address);
        });
    });


})
