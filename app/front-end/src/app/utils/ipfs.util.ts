import { CID } from 'ipfs-http-client';
import { bytes, digest } from 'multiformats';
import { IpfsConstant } from '../common/ipfs.constant';

export class IpfsUtil {
  public static parseToCid(cidStr: string): CID {
    return CID.createV0(digest.create(18, bytes.fromHex(cidStr).slice(1)));
  }

  public static cidToLink(cid: CID): string {
    return `http://${IpfsConstant.IPFS_HOST}:${IpfsConstant.IPFS_RESOURCES_PORT}/ipfs/${cid.toString()}`;
  }
}
