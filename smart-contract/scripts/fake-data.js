const bs58 = require("bs58");

const Application = artifacts.require("Application");
const License = artifacts.require("License");

async function createApplications(licensePlace, publisher) {
  const appPrice = 30;

  const appData = [
    {
      name: "IntelliJ",
      symbol: "ITJ",
      publisher: publisher.address,
      cid: to32ByteString("QmWHAPjV3mDyLuxvwJcK11Ud9g4Net8tanLJLefpuLVJ1K"),
    },
    {
      name: "Visual Studio",
      symbol: "VSP",
      publisher: publisher.address,
      cid: to32ByteString("QmUat6pTRkwFDitngBkiPGvzWDu3YKLwyQ4qs7icHeSyXU"),
    },
    {
      name: "The Witcher 3",
      symbol: "WIT3",
      publisher: publisher.address,
      cid: to32ByteString("QmZVxB2ub6EVVRz36A1R3UMX72NYgc1tCLdjvZoNamiby3"),
    },
    {
      name: "God of War",
      symbol: "GOW",
      publisher: publisher.address,
      cid: to32ByteString("QmesiDDUissjnnEQMFa9ftyZwRsdULXsBTLMiguEzvk1aB"),
    },
    {
      name: "Only Fans",
      symbol: "OF",
      publisher: publisher.address,
      cid: to32ByteString("QmS98nZHtFJmTo1AFtGjoDf8eXkFtrk3zBWE8UhH7cVRNp"),
    },
    {
      name: "Photoshop",
      symbol: "PTS",
      publisher: publisher.address,
      cid: to32ByteString("QmWBZ74DJfDsDX8idngjSAdVkH1dXp9RnTLQB6mpzxfUd8"),
    },
  ];

  const apps = [];
  for (const appDatum of appData) {
    const app = await Application.new(appDatum, { from: publisher.address });

    console.log(`Create ${appDatum.name} at ${app.address}`);

    await licensePlace.connect(publisher).registerApp(app.address, {
      value: web3.utils.toWei(`${appPrice}`, "wei"),
    });

    await createLicenses(publisher, app);

    apps.push(app);
  }

  return apps;
}

async function createLicenses(publisher, app) {
  const licenseData = [
    {
      name: "Normal",
      symbol: "NOR",
      price: getRandomInt(50, 100),
      cid: to32ByteString("QmYor4FyNXyg3xfp9znDN2za2yczHAtT63oTMgQWR5nMnA"),
    },
    {
      name: "Premium",
      symbol: "PRE",
      price: getRandomInt(50, 100),
      cid: to32ByteString("QmW32hWEPUiFHsqfThzbgrwXGsfpJdFckTf7rbB2g6TaQW"),
    },
    {
      name: "Ultimate",
      symbol: "UTM",
      price: getRandomInt(50, 100),
      cid: to32ByteString("QmcoCVFmx8ZrcySeT2ZqypVRjuGiTs1AT74p1vNaba5zdg"),
    },
  ];

  const licenses = [];
  for (const datum of licenseData) {
    const license = await License.new(datum, { from: publisher.address });

    await app.addLicenseContract(license.address, {
      from: publisher.address,
    });

    console.log(`License: Create ${datum.name} at ${license.address}`);

    licenses.push(license);
  }

  console.log(`Create ${licenses.length} licenses for ${await app.name()}`);

  return licenses;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return web3.utils.toWei(
    `${Math.floor(Math.random() * (max - min + 1)) + min}`
  );
}

const to32ByteString = (hash) => {
  return web3.utils.bytesToHex(bs58.decode(hash).slice(2));
};

module.exports = { createApplications };
