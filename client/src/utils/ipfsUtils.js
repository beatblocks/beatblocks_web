import bs58 from 'bs58';

export const fromIPFSHash = hash => {
  const bytes = bs58.decode(hash);
  const multiHashId = 2;
  // remove the multihash hash id
  return bytes.slice(multiHashId, bytes.length);
};
