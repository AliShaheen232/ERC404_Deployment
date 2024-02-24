```
npm install
```

ERC404.sol: This contract implements the ERC-404 standard, defining the core functionality that enables the mixed fungible and non-fungible token features.

New404.sol: This is our custom token contract that inherits from ERC404.sol. Here, we can define specific behaviors, tokenomics, and additional features that are unique to our token.

```.env
RPC_URL="YOUR_RPC_URL"
PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
```

Execute the command below to run your test scripts.

```
npx hardhat test
```

Deploy your ERC-404 contract
Execute the command below to deploy your ERC-404 contract.

```
npx hardhat run scripts/deploy.ts --network sepolia
```
