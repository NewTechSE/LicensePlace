import {
    ApplicationInstance,
    LicensePlaceInstance,
} from "../types/truffle-contracts";

const LicensePlace = artifacts.require("LicensePlace");
const Application = artifacts.require("Application");

contract("LicensePlace", (accounts) => {
    console.log("accounts:", accounts);

    const creatorAddress = accounts[0];
    const externalAddress = accounts[3];
    const visitorAddress = accounts[7];

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
        let licensePlace: LicensePlaceInstance;

        let application: ApplicationInstance;

        let cid: string;

        before(async () => {
            licensePlace = await LicensePlace.deployed();

            cid = web3.utils.asciiToHex("0x123456789012345678901234567890");
            application = await Application.new(
                {
                    name: "My App",
                    symbol: "MYAPP",
                    publisher: externalAddress,
                    cid: cid,
                },
                { from: externalAddress }
            );

            await licensePlace.registerApp(
                application.address,
                { from: externalAddress, value: web3.utils.toWei("30", "wei") }
            );
        });

        it("Should allow client to register their app", async () => {
            assert.equal(
                await application.name(),
                "My App",
                "App name is not correct"
            );

            assert.equal(
                await application.symbol(),
                "MYAPP",
                "App symbol is not correct"
            );

            assert.equal(
                await application.publisher(),
                externalAddress,
                "App publisher is not correct"
            );

            assert.equal(
                await application.owner(),
                externalAddress,
                "App owner is not correct"
            );

            assert.equal(await application.cid(), cid, "App CID is not correct");
        });

        it("Should allow client to change app name", async () => {
            await application.setName("My New App", { from: externalAddress });
            assert.equal(
                await application.name(),
                "My New App",
                "App name is not correct"
            );
        });

        it("Should not allow random user to change app name", async () => {
            try {
                await application.setName("My New App", { from: visitorAddress });
            } catch (error: any) {
                expect(error.toString()).to.contain("revert");
            }
        });

        it("Should allow client to change app cid", async () => {
            const newCid = web3.utils.asciiToHex("0x555555555555555555555555555555");
            await application.setCid(newCid, { from: externalAddress });

            assert.equal(await application.cid(), newCid, "App CID is not correct");
        });

        it("Should not allow random user to change app cid", async () => {
            try {
                const newCid = web3.utils.asciiToHex(
                    "0x555555555555555555555555555555"
                );
                await application.setCid(newCid, { from: visitorAddress });
            } catch (error: any) {
                expect(error.toString()).to.contain("revert");
            }
        });

        it("Should get all apps address", async () => {
            const addresses = await licensePlace.getAppAddresses();
            assert.equal(addresses.length, 1, "App count is not correct");
            assert.equal(addresses[0], application.address, "App address is not correct");
        });

        it("Should be able to update app info", async () => {
            await Promise.all([
                application.setName("License Place", { from: externalAddress }),
                application.setCid(
                    web3.utils.asciiToHex("0x123456789012345678901234567890"),
                    {
                        from: externalAddress,
                    }
                ),
                application.setPublisher(visitorAddress, { from: externalAddress }),
            ]);

            assert.equal(await application.name(), "License Place");
            assert.equal(
                web3.utils.hexToAscii(await application.cid()),
                "0x123456789012345678901234567890"
            );
            assert.equal(await application.publisher(), visitorAddress);
        });

        it("Should remove app", async () => {
            await licensePlace.removeApp(application.address, { from: externalAddress });

            const addresses = await licensePlace.getAppAddresses(); 
            assert.equal(addresses.length, 0, "App count is not correct");
        });
    });
});
