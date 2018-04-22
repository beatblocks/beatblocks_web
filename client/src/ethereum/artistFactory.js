import { web3 } from './web3';
import ArtistFactory from './build/ArtistFactory.json';

const artistFactory = new web3.eth.Contract(JSON.parse(ArtistFactory.interface), '0x962D382959428C9B33E371FAe6f074787D5637aB');
export { artistFactory };
