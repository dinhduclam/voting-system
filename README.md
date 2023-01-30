# voting-system

#Download:
 - Gananche: https://trufflesuite.com/ganache/
 - Nodejs: https://nodejs.org/en/download/
 - In a terminal, use NPM to install Truffle: npm install -g truffle
 - In VS Code, install extension: 
    + solidity: https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity
    + Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
 - Add MetaMask extension
#Deploy contract:
In VS Code terminal: truffle migrate

**Sample response:**
Compiling your contracts...
===========================
> Compiling .\contracts\Ballot.sol
> Artifacts written to C:\Users\WBPC.VN\VS Code\Voting_system\client\contracts
> Compiled successfully using:
   - solc: 0.8.17+commit.8df45f5f.Emscripten.clang


Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_deploy_contracts.js
=====================

   Replacing 'Ballot'
   ------------------
   > transaction hash:    0x88e9cc26e1267edd5c244319fd86b348e929c3a0e6e192d4c896a4c771ed9321
   > Blocks: 0            Seconds: 0
   > contract address:    0x531c6d2FFAFda71C3Daa2EE941B37465f7D17Fd5
   > block number:        52
   > block timestamp:     1675094740
   > account:             0xb1Dfc17A255Af7c5cE44e0dD863e99B5f554fc37
   > balance:             25.681572356
   > gas used:            1763702 (0x1ae976)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03527404 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03527404 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.03527404 ETH
--------------------------------------------------------------


**Get contract address from response: 0x531c6d2FFAFda71C3Daa2EE941B37465f7D17Fd5**
Assign new contract address to *contractAdress* variable in *./client/js/ballot.js*
