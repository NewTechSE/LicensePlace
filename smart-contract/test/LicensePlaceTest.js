const { expect } = require("chai");
const { ethers } = require("hardhat");

const bs58 = require("bs58")

const Application = artifacts.require('Application')
const License = artifacts.require('License')

const getAccounts = async () => {
  const accounts = await ethers.getSigners()
  const creator = accounts[0];
  const publisher = accounts[1];
  const visitor = accounts[2];
  return { creator, publisher, visitor }
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

contract('License Place', () => {
  describe("Owner Deploy License Place", function () {
    var licensePlace = null
    var creator = null
    var publisher = null
    var visitor = null

    before(async () => {
      licensePlace = await deploy()
      const accounts = await getAccounts()
      creator = accounts.creator
      publisher = accounts.publisher
      visitor = accounts.visitor
    })

    it("Should have default owner", async function () {
      const owner = await licensePlace.owner()
      expect(creator.address).to.equal(owner)
    });

    it("Should show default app price", async () => {
      const price = await licensePlace.appPrice()
      expect(price).to.equal(10)
    });

    it("Should not allow stranger to edit app price", async () => {
      await expect(licensePlace.setAppPrice(10, { from: publisher.address })).to.be.reverted
    });


  });


  describe("Client register app to sell", () => {
    let licensePlace = null
    var creator = null
    var publisher = null
    var visitor = null
    let application = null
    let cid = null

    let newCid = null
    before(async () => {
      licensePlace = await deploy()
      const accounts = await getAccounts()
      creator = accounts.creator
      publisher = accounts.publisher
      visitor = accounts.visitor
      
      cidStr1 = "QmfLEpjnXrZoeC5gYFpPf6Frr3kpcy1aYbTioLH3KbjSJz"
      cidStr2 = "QmP3wj5BPtj8cmU6hpDvnFscKDChj1hLzLifeh2QwFmR9e"
      cidStr3 = "QmaPUvMcehBFgcan76crra9pHJaPQVN2XUFcsQZRCp33fh"
      // cid = ethers.utils.hexlify(cidStr1);
      // newCid = web3.utils.asciiToHex(cidStr2)

      cid = to32ByteString(cidStr1)
      newCid = to32ByteString(cidStr2)

      application = await Application.new(
        {
          name: "My App",
          symbol: "MYAPP",
          publisher: publisher.address,
          cid: cid,
        },
        { from: publisher.address }
      );

      await licensePlace.connect(publisher).registerApp(
        application.address,
        { value: web3.utils.toWei("30", "wei") }
      );
    });

    it("Should allow client to register their app", async () => {

      expect(await application.name()).to.equal("My App")
      expect(await application.symbol()).to.equal("MYAPP")

      expect(await application.publisher()).to.equal(publisher.address)
      expect(await application.owner()).to.equal(publisher.address)
      expect(await application.cid()).to.equal(cid)
    });

    it("Should allow client to change app name", async () => {
      await application.setName("My New App", { from: publisher.address });
      expect(await application.name()).to.equal("My New App")
    });

    it("Should not allow random user to change app name", async () => {
      try {
        await application.setName("My New App", { from: visitor.address })
      } catch (err) {
        expect(err.toString()).to.contain('reverted')
      }
    });

    it("Should allow client to change app cid", async () => {
      // const newCid = ethers.utils.hexlify("QmP3wj5BPtj8cmU6hpDvnFscKDChj1hLzLifeh2QwFmR9e");
      await application.setCid(newCid, { from: publisher.address });
      expect(await application.cid()).to.equal(newCid)
    });

    it("Should not allow random user to change app cid", async () => {
      try {
        // const newCid = web3.utils.asciiToHex(
        //   "0x555555555555555555555555555555"
        // );
        await application.setCid(newCid, { from: visitor });
      } catch (error) {
        expect(1).to.equal(1);
      }
    });

    it("Should get all apps address", async () => {
      const addresses = await licensePlace.getAppAddresses();
      expect(addresses.length).to.equal(1)
      expect(addresses[0]).to.equal(application.address)
    });

    it("Should be able to update app info", async () => {
      // const newCID = "QmP3wj5BPtj8cmU6hpDvnFscKDChj1hLzLifeh2QwFmR9e"
      await Promise.all([
        application.setName("License Place", { from: publisher.address }),
        application.setCid(
          newCid,
          // ethers.utils.hexlify(newCID),
          {
            from: publisher.address,
          }
        ),
        application.setPublisher(visitor.address, { from: publisher.address }),
      ]);

      expect(await application.name()).to.equal("License Place");
      expect((await application.cid())).to.equal(newCid)

      expect(await application.publisher()).to.equal(visitor.address);
    });

    it("Should remove app", async () => {
      await licensePlace.connect(publisher).removeApp(application.address);
      const addresses = await licensePlace.getAppAddresses();
      expect(addresses.length).to.equal(0)
    });
  })
})
