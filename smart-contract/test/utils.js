const bs58 = require("bs58")
const web3 = require("web3")

const to32ByteString = (hash) => {
    return web3.utils.bytesToHex(bs58.decode(hash).slice(2))
}

const from32ByteString = (ipfsHash) => {
    return bs58.encode(web3.utils.hexToBytes("0x1220"+ipfsHash.slice(2)))
}

module.export = {
    to32ByteString,
    from32ByteString
}