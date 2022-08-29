const bs58 = require("bs58")

const Application = artifacts.require("Application");
const License = artifacts.require("License");

const createApplications = async (licensePlace, publisher) => {
  const appPrice = 30;

  const appData = [
    {
      name: "IntelliJ",
      symbol: "ITJ",
      publisher: publisher.address,
      cid: to32ByteString("QmSZqJQibmzwXBknVj8hwgeuDPYQwYMfyh3ZqsSArvX5JJ"),
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
      cid: to32ByteString("QmVzop9HTPNWMMf1xz1R511yqNPpi5TRtqsVm7Lg7JTV2e"),
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
      cid: to32ByteString("QmefBZqLQoBkzkUndj5mPn2Qa7BhXSamHBJJi3LGD5FpXL"),
    },
    {
      name: "Photoshop",
      symbol: "PTS",
      publisher: publisher.address,
      cid: to32ByteString("QmcPfFQfwtkKJgaUpqSkdFb5w5Km5CNZGZcpeEGp296Pqu"),
    },
  ];

  const apps = appData.map(async (appDatum) => {
    const app = await Application.new(appDatum, { from: publisher.address });

    await licensePlace.connect(publisher).registerApp(app.address, {
      value: web3.utils.toWei(`${appPrice}`, "wei"),
    });

    const licenses = await createLicenses(publisher);
    licenses.forEach(async (license) => {
      // console.log(license)
      await app.addLicenseContract(license.address, { from: publisher.address });
    })

    return app;
  });

  return apps;
};

const createLicenses = async (publisher) => {
  const licenseData = [
    {
      name: "Normal",
      symbol: "NOR",
      price: getRandomInt(500, 5000),
      cid: to32ByteString("QmYor4FyNXyg3xfp9znDN2za2yczHAtT63oTMgQWR5nMnA"),
    },
    {
      name: "Premium",
      symbol: "PRE",
      price: getRandomInt(500, 5000),
      cid: to32ByteString("QmW32hWEPUiFHsqfThzbgrwXGsfpJdFckTf7rbB2g6TaQW"),
    },
    {
      name: "Ultimate",
      symbol: "UTM",
      price: getRandomInt(500, 5000),
      cid: to32ByteString("QmcoCVFmx8ZrcySeT2ZqypVRjuGiTs1AT74p1vNaba5zdg"),
    },
  ];

  const licenses = []
  licenseData.forEach(async (datum) => {
    const license = await License.new(datum, { from: publisher.address });

    licenses.push(license)
  });

  return licenses;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return web3.utils.toWei(`${Math.floor(Math.random() * (max - min + 1)) + min}`, "wei");
}

const to32ByteString = (hash) => {
  return web3.utils.bytesToHex(bs58.decode(hash).slice(2))
}

module.exports = { createApplications };