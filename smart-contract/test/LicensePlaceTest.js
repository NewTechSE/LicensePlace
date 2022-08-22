const { expect } = require("chai");
const { ethers } = require("hardhat");

const Application = artifacts.require('Application')
const License = artifacts.require('License')

const getAccounts = async () => {
  const accounts = await ethers.getSigners()
  const creator = accounts[0];
  const publisher = accounts[1];
  const visitor = accounts[2];
  return { creator, publisher, visitor }
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

    before(async () => {
      licensePlace = await deploy()
      const accounts = await getAccounts()
      creator = accounts.creator
      publisher = accounts.publisher
      visitor = accounts.visitor

      // cid = web3.utils.asciiToHex("0x48656c6c6f20576f726c64210");
      cid = ethers.utils.hexlify("0x48656c6c6f20576f726c64210000000000000000000000000000000000000000");

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
      const newCid = ethers.utils.hexlify("0x48656c6c6f20576f726c64210000000000000000000000000000000000000999");
      await application.setCid(newCid, { from: publisher.address });
      expect(await application.cid()).to.equal(newCid)
    });

    it("Should not allow random user to change app cid", async () => {
      try {
        const newCid = web3.utils.asciiToHex(
          "0x555555555555555555555555555555"
        );
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
      const newCID = "0x48656c6c6f20576f726c64210000000000000000000000000000000000000111"
      await Promise.all([
        application.setName("License Place", { from: publisher.address }),
        application.setCid(
          ethers.utils.hexlify(newCID),
          {
            from: publisher.address,
          }
        ),
        application.setPublisher(visitor.address, { from: publisher.address }),
      ]);

      expect(await application.name()).to.equal("License Place");
      expect((await application.cid())).to.equal(newCID)

      expect(await application.publisher()).to.equal(visitor.address);
    });

    it("Should remove app", async () => {
      await licensePlace.connect(publisher).removeApp(application.address);
      const addresses = await licensePlace.getAppAddresses();
      expect(addresses.length).to.equal(0)
    });
  })
})
