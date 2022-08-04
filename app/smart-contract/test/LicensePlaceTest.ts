const LicensePlace = artifacts.require("LicensePlace");
const ERC721App = artifacts.require("ERC721App");

contract("LicensePlace", (accounts) => {
  console.log("accounts:", accounts);

  const creatorAddress = accounts[0];
  const externalAddress = accounts[3];

  describe("Contructor and Access Control", () => {
    it("Should have default owner", async () => {
      const licensePlace = await LicensePlace.deployed();
      const owner = await licensePlace.owner();
      assert.equal(owner, creatorAddress);
    });

    it("Should show default app price", async () => {
      const licensePlace = await LicensePlace.deployed();
      const price = await licensePlace.appPrice();
      assert.equal(price.toNumber(), 10);
    });

    it("Should not allow stranger to edit app price", async () => {
      const licensePlace = await LicensePlace.deployed();
      try {
        await licensePlace.setAppPrice(10, { from: externalAddress });
      } catch (error: any) {
        expect(error.toString()).to.contain("revert");
      }
    });

    it("Should allow owner to edit app price", async () => {
      const licensePlace = await LicensePlace.deployed();
      await licensePlace.setAppPrice(20, { from: creatorAddress });
      const price = await licensePlace.appPrice();
      assert.equal(price.toNumber(), 20);
    });
  });

  describe("Client register app to sell", () => {
    it("Should allow client to register their app", async () => {
      const licensePlace = await LicensePlace.deployed();

      const cid = web3.utils.asciiToHex("0x123456789012345678901234567890");
      const response = await licensePlace.registerApp(
        {
          name: "My App",
          symbol: "MYAPP",
          publisher: externalAddress,
          cid: cid,
        },
        { from: externalAddress, value: web3.utils.toWei("30", "wei") }
      );

      const contractAddress = response.logs[0].address;
      const erc721App = await ERC721App.at(contractAddress);

      assert.equal(await erc721App.name(), "My App", "App name is not correct");

      assert.equal(
        await erc721App.symbol(),
        "MYAPP",
        "App symbol is not correct"
      );

      assert.equal(
        await erc721App.publisher(),
        externalAddress,
        "App publisher is not correct"
      );

      assert.equal(
        await erc721App.owner(),
        licensePlace.address,
        "App owner is not correct"
      );

      assert.equal(
        await erc721App.tokenURI(0),
        web3.utils.hexToAscii(cid),
        "App tokenURI is not correct"
      );
    });
  });
});
