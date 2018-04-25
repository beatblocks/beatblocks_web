Instructions to set up run:

Getting Metamask and some test ether:

1. Get the metamask chrome extension: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn
2. Set up metamask account
3. Switch metamask to interface with the Rinkeby test net
4. Get some test ether (follow the instructions): https://faucet.rinkeby.io/

*Note: The applications contract is deployed on Rinkeby only

Running the client:

1. Install node and npm: https://nodejs.org/en/download/
2. git clone https://github.com/beatblocks/beatblocks_web
3. navigate to the root of the project
4. run: "npm install && npm start"

Details:

App entry point is under App.js

The app utilizes several frameworks that compose a MVC framework:

Redux: Handles Model and Control
React: Handles View

Dependencies:

All but metamask are all listed in the file called package.json

Some of the important ones are:
    web3.js - API that impliments Ethereum's RPC
    ipfs-js - API for IPFS interaction
    solc: Solidity compiler that provides ABI for smart contracts
    
Areas of interest:

- /src/ethereum/contracts/BeatBlocks.sol - Solidity code for both contracts
- /src/ethereum/web3.js - Imports the reference to metamask's instance of web3
- /src/ethereum/deploy.js - Deploys the Artist Factory contract
- /src/ethereum/compile.js - Compiles each contract and writes their interfaces to build
- /src/ethereum/artistFactory.js - References the currently deployed Artist Factory
- /src/ethereum/Artist.js - "Constructor" for retrieving instance of the contract's interface using it's address
- /src/ethereum/build - The storage location for Smart Contract ABIs
- /src/ethereum/actions - This is where all the interactions with Ethereum happen
- /src/ethereum/reducers - This models the application's state and how it is effected.
