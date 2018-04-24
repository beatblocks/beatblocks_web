import { web3 } from './web3';
import ArtistFactory from './build/ArtistFactory.json';

const artistFactory = new web3.eth.Contract(JSON.parse(ArtistFactory.interface), '0x8F889d6b516bD9769f043a64E85E89914bF0b760');
export { artistFactory };
