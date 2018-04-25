import { web3 } from './web3';
import ArtistFactory from './build/ArtistFactory.json';

const artistFactory = new web3.eth.Contract(JSON.parse(ArtistFactory.interface), '0x4B63b5fb4Ad8eA3E842A4d57308A53383633AeE0');
export { artistFactory };
