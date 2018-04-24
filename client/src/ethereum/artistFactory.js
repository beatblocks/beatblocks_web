import { web3 } from './web3';
import ArtistFactory from './build/ArtistFactory.json';

const artistFactory = new web3.eth.Contract(JSON.parse(ArtistFactory.interface), '0x48FDF4BB731fA4189D90f19D60468648df7087A3');
export { artistFactory };
