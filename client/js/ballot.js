contractAdress = '0xF32188B9856212502E14e189C4c484BfDD537546';
provider = 'ws://localhost:7545'
maxGas = 1000000;

Ballot = {
    contract: null,

    initContract: async function(){
        const ballot = await fetch('./contracts/Ballot.json')
        .then(function (response) {
            return response.json();
        });

        const web3 = new Web3(provider);
        const ballotContract = new web3.eth.Contract(ballot.abi, contractAdress);
        console.log(ballotContract);
        contract  = ballotContract;
    },

    getAccount: async function(){
        if (window.ethereum) {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              return accounts[0];
            } catch (error) {
              if (error.code === 4001) {
                // User rejected request
              }
            }
          }
    },

    addProposal: async function(name, age){
        if (typeof contract == 'undefined'){
            const response = {
                success: false,
                message: `Add proposal fail! Contract is not defined`
            };
            console.log(response);
            return response;
        }
            
        
        sender = await this.getAccount();
        console.log(sender)
        contract.methods.addProposal(name, age).send({from: sender, gas: maxGas})
        .then(res => {
            const response = {
                success: true,
                message: 'Add proposal successfully!'
            };

            console.log(response);

            return response;
        })
        .catch(err => {
            const response = {
                success: false,
                message: `Add proposal fail! ${err.message}`
            };

            console.log(response);

            return response;
        });

        
    },

    giveRightToVote: async function(address){
        if (typeof contract == 'undefined'){
            const response = {
                success: false,
                message: `Give right to address ${address} fail! Contract is not defined`
            };
            console.log(response);
            return response;
        }

        sender = await this.getAccount();
        console.log(sender)
        contract.methods.giveRightToVote(address).send({from: sender, gas: maxGas})
        .then(res => {
            const response = {
                success: true,
                message: `Give right to address ${address} successfully!`
            };

            console.log(response);

            return response;
        })
        .catch(err => {
            const response = {
                success: false,
                message: `Give right to address ${address} fail! ${err.message}`
            };

            console.log(response);

            return response;
        });
    },

    delegate: async function(to) {
        if (typeof contract == 'undefined'){
            const response = {
                success: false,
                message: `Delegate to address ${to} fail! Contract is not defined`
            };
            console.log(response);
            return response;
        }

        sender = await this.getAccount();
        console.log(sender);
        contract.methods.delegate(to).send({from: sender, gas: maxGas})
        .then(res => {
            const response = {
                success: true,
                message: `Delegate to address ${to} successfully!`
            };

            console.log(response);

            return response;
        })
        .catch(err => {
            const response = {
                success: false,
                message: `Delegate to address ${to} fail! ${err.message}`
            };

            console.log(response);

            return response;
        });
    }

}

window.onload = (event) => {
    Ballot.initContract();
}