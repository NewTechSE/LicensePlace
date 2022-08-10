import {
    ApplicationInstance,
    LicenseInstance,
    LicensePlaceInstance,
} from "../types/truffle-contracts";
import { assertRevert } from "./utils/assertion-utils";

const LicensePlace = artifacts.require("LicensePlace");
const Application = artifacts.require("Application");
const License = artifacts.require("License");

contract("Application And License", (accounts) => {
    console.log("accounts:", accounts);

    const publisherAddress = accounts[3];
    const rarndomUserAddress = accounts[7];

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
    });
});
