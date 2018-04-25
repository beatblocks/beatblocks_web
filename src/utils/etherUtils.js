import { BigNumber } from 'bignumber.js';

export const etherToWei = (ether) => {
  return BigNumber(`${ether}e18`);
};

export const weiToEther = (ether) => {
  return BigNumber(`${ether}e-18`);
};
