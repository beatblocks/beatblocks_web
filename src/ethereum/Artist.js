import { web3 } from './web3';
import ArtistJSON from './build/Artist.json';

const Artist = (address) => new web3.eth.Contract(JSON.parse(ArtistJSON.interface), address);
export { Artist };
