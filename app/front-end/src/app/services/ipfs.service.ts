import { Injectable } from '@angular/core';
import { CID, create, IPFSHTTPClient } from 'ipfs-http-client';
import { IpfsConstant } from '../common/ipfs.constant';

// noinspection HttpUrlsUsage
@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  private ipfsServer: IPFSHTTPClient = create({
    host: IpfsConstant.IPFS_HOST,
    port: IpfsConstant.IPFS_PORT,
  })

  public async upload(content: File): Promise<CID> {
    const result = await this.ipfsServer.add(content);
    return result.cid;
  }
}
