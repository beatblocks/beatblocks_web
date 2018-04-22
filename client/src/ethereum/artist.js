import { web3 } from './web3';
import Artist from './build/Artist.json';

const artist = (address) => new web3.eth.Contract(JSON.parse(Artist.interface), address);
export { artist };
