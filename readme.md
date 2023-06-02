To start the project:
1. yarn
2. npm run dev

To use it:
1. use this private key - 0b195f7242d8aeef040091bcf8e4af65a33ebab14ed72a1118d8ede03b1b666a
It has two custom erc20 tokens for testing:
- BTCM - 0x79C5657b983d6d727a0CF285114A1CA97703D9cd (https://sepolia.etherscan.io/token/0x79C5657b983d6d727a0CF285114A1CA97703D9cd)
- ETHM - 0x6eD72cFf274461AEBA7086396A18bd76fF2615B9 (https://sepolia.etherscan.io/token/0x6eD72cFf274461AEBA7086396A18bd76fF2615B9)
And it has some test eth on sepolia


I've implemented history of eth transactions, but did not implement erc20 token transactions.
I think they should be implemented using Transfer events.