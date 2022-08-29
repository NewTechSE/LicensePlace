const Application = artifacts.require("Application");
const License = artifacts.require("License");

const createApplications = async (licensePlace, publisher) => {
  const appPrice = 30;

  const appData = [
    {
      name: "IntelliJ",
      symbol: "ITJ",
      publisher: publisher.address,
      cid: "QmSZqJQibmzwXBknVj8hwgeuDPYQwYMfyh3ZqsSArvX5JJ",
    },
    {
      name: "Visual Studio",
      symbol: "VSP",
      publisher: publisher.address,
      cid: "QmUat6pTRkwFDitngBkiPGvzWDu3YKLwyQ4qs7icHeSyXU",
    },
    {
      name: "The Witcher 3",
      symbol: "WIT3",
      publisher: publisher.address,
      cid: "QmVzop9HTPNWMMf1xz1R511yqNPpi5TRtqsVm7Lg7JTV2e",
    },
    {
      name: "God of War",
      symbol: "GOW",
      publisher: publisher.address,
      cid: "QmesiDDUissjnnEQMFa9ftyZwRsdULXsBTLMiguEzvk1aB",
    },
    {
      name: "Only Fans",
      symbol: "OF",
      publisher: publisher.address,
      cid: "QmefBZqLQoBkzkUndj5mPn2Qa7BhXSamHBJJi3LGD5FpXL",
    },
    {
      name: "Photoshop",
      symbol: "PTS",
      publisher: publisher.address,
      cid: "QmcPfFQfwtkKJgaUpqSkdFb5w5Km5CNZGZcpeEGp296Pqu",
    },
  ];

  const apps = appData.map(async (appDatum) => {
    const app = await Application.new(appDatum, { from: publisher.address });

    await licensePlace.connect(publisher).registerApp(app.address, {
      value: web3.utils.toWei(appPrice, "wei"),
    });

    const licenses = await createLicenses(publisher);
    licenses.forEach(async (license) => {
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
      cid: "QmYor4FyNXyg3xfp9znDN2za2yczHAtT63oTMgQWR5nMnA",
    },
    {
      name: "Premium",
      symbol: "PRE",
      price: getRandomInt(500, 5000),
      cid: "QmW32hWEPUiFHsqfThzbgrwXGsfpJdFckTf7rbB2g6TaQW",
    },
    {
      name: "Ultimate",
      symbol: "UTM",
      price: getRandomInt(500, 5000),
      cid: "QmcoCVFmx8ZrcySeT2ZqypVRjuGiTs1AT74p1vNaba5zdg",
    },
  ];

  const licenses = licenseData.map(async (datum) => {
    return await License.new(datum, { from: publisher.address });
  });

  return licenses;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { createApplications };