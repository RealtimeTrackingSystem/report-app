import { IHost } from './host.interface';
import { IHostMember } from './host-member.interface';

export interface IHostMembership {
  host: IHost;
  hostMember: IHostMember;
}
