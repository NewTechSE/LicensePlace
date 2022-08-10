import {
    ApplicationInstance,
    LicenseInstance,
    LicensePlaceInstance
} from "../types/truffle-contracts";
import { assertRevert } from "./utils/assertion-utils";

const LicensePlace = artifacts.require("LicensePlace");
const Application = artifacts.require("Application");
const License = artifacts.require("License");

contract("Application And License", (accounts) => {
    console.log("accounts:", accounts);

    const publisherAddress = accounts[3];
    const rarndomUserAddress = accounts[7];
    const buyerAddress = accounts[8];

    let licensePlace: LicensePlaceInstance;
    let application: ApplicationInstance;
    let license: LicenseInstance;

    before(async () => {
        licensePlace = await LicensePlace.deployed();

        const cid = web3.utils.asciiToHex("0x123456789012345678901234567890");
        const response = await licensePlace.registerApp(
            {
                name: "My App",
                symbol: "MYAPP",
                publisher: publisherAddress,
                cid: cid,
            },
            { from: publisherAddress, value: web3.utils.toWei("30", "wei") }
        );

        const contractAddress = response.logs[0].address;
        application = await Application.at(contractAddress);
    });

    describe("Application Publisher", () => {
        it("Should be able to create license", async () => {
            license = await License.new(
                {
                    name: "MIT",
                    symbol: "MIT",
                    price: 10,
                    cid: web3.utils.asciiToHex("0x123456789012345678901234567890"),
                },
                { from: publisherAddress }
            );

            assert.equal(await license.name(), "MIT");
            assert.equal(await license.symbol(), "MIT");
            assert.equal((await license.price()).toNumber(), 10);
            assert.equal(
                await license.cid(),
                web3.utils.asciiToHex("0x123456789012345678901234567890")
            );
        });

        it("Should allow publisher to register their license contract", async () => {
            await application.addLicenseContract(license.address, {
                from: publisherAddress,
            });

            const licenseContracts = await application.getLicenseContracts();

            assert.equal(licenseContracts.length, 1);
            assert.equal(licenseContracts[0], license.address);
        });

        it("Should not allow random user to add license contract", async () => {
            const vsCodeLicense = await License.new(
                {
                    name: "VSCode",
                    symbol: "VSC",
                    price: 10,
                    cid: web3.utils.asciiToHex("0x123456789012345678901234567890"),
                },
                { from: rarndomUserAddress }
            );

            assertRevert(
                application.addLicenseContract(vsCodeLicense.address, {
                    from: rarndomUserAddress,
                }),
                "Only publisher can add license contract"
            );
        });

        it("Should allow publisher to update license info", async () => {
            await Promise.all([
                license.setPrice(20, { from: publisherAddress }),
                license.setCid(web3.utils.asciiToHex("0x555555555555"), { from: publisherAddress })
            ]);

            assert.equal((await license.price()).toNumber(), 20);
            assert.equal(web3.utils.hexToString(await license.cid()), "0x555555555555");
        });
    });

    describe("Application License", () => {
        it("Should let everyone buy license", async () => {
            const response = await license.buyLicense(
                { from: rarndomUserAddress, value: web3.utils.toWei("25", "wei") }
            );

            const tokenId = (response.logs[0].args as any)["tokenId"] as string;

            const ownerAddress = await license.ownerOf(tokenId);
            assert.equal(ownerAddress, rarndomUserAddress);
        });

        it("Should not allow to buy if they don't pay", async () => {
            assertRevert(
                license.buyLicense({ from: rarndomUserAddress }),
                "Not enought ether"
            );
        });

        it("Should let user sell their license", async () => {
            await license.putLicenseForSale(
                {
                    tokenId: 0,
                    price: web3.utils.toWei("5", "wei"),
                    cid: web3.utils.asciiToHex("0x123456789012345678901234567890"),
                },
                { from: rarndomUserAddress }
            );

            const saleTokenIds = await license.getLicenseForSale();

            assert.equal(saleTokenIds.length, 1);
            assert.equal(saleTokenIds[0].toNumber(), 0);
        });

        it("Should let user buy license from another user", async () => {
            const tokenId = 0;

            await license.buyLicenseByTokenId(
                tokenId,
                { from: buyerAddress, value: web3.utils.toWei("25", "wei") }
            );

            const tokenOwner = await license.ownerOf(tokenId);

            assert.equal(tokenOwner, buyerAddress);
            assert.notEqual(tokenOwner, rarndomUserAddress);
        });
    });
});
