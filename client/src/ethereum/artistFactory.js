import { web3 } from './web3';
import ArtistFactory from './build/ArtistFactory.json';

const artistFactory = new web3.eth.Contract(JSON.parse(ArtistFactory.interface), '0xe9101fAF304835224176C31383306C266eb05686');
export { artistFactory };
