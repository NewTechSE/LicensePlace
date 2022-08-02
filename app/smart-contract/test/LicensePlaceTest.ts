const LicensePlace = artifacts.require("LicensePlace");

contract("LicensePlace", (accounts) => {
  const creatorAddress = accounts[0];
  const externalAddress = accounts[3];

  it("Should have default owner", async () => {
    const licensePlace = await LicensePlace.deployed();
    const owner = await licensePlace.owner();
    assert.equal(owner, creatorAddress);
  });

  it("Should show default app price", async () => {
    const licensePlace = await LicensePlace.deployed();
    const price = await licensePlace.APP_PRICE();
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
    const price = await licensePlace.APP_PRICE();
    assert.equal(price.toNumber(), 20);
  });
});
