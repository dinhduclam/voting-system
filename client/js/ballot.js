contractAdress = '0xa279b030Aa8f53620DB39d179e44Ea498Fc705A1';
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
        contract  = ballotContract;
    },

    getAccount: async function(){
        if (window.ethereum) {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              return accounts[0];
            } catch (error) {
                throw new Error(`Get account address from MetaMask fail! ${error.message}`)
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
        contract.methods.addProposal(name, age).send({from: sender, gas: maxGas})
        .then(_ => {
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
        contract.methods.delegate(to).send({from: sender, gas: maxGas})
        .then(_ => {
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
    },

    vote: async function(proposalId){
        if (typeof contract == 'undefined'){
            const response = {
                success: false,
                message: `Vote fail! Contract is not defined`
            };
            console.log(response);
            return response;
        }

        sender = await this.getAccount();
        contract.methods.vote(proposalId).send({from: sender, gas: maxGas})
        .then(_ => {
            const response = {
                success: true,
                message: `Vote successfully!`
            };

            console.log(response);
            return response;
        })
        .catch(err => {
            const response = {
                success: false,
                message: `Vote fail! ${err.message}`
            };

            console.log(response);
            return response;
        });
    },

    getResult: async function() {
        if (typeof contract == 'undefined'){
            const response = {
                success: false,
                message: `Get result fail! Contract is not defined`
            };
            console.log(response);
            return response;
        }

        sender = await this.getAccount();

        contract.methods.getResult().call()
        .then(proposals => {
            contract.methods.voterCount().call()
            .then(voterCount => {
                var votedCount = 0;
                proposals.forEach(x => votedCount += Number(x.voteCount));

                const result = {
                    success: true,
                    data: {
                        voterCount: voterCount,
                        votedCount: votedCount,
                        proposals: proposals
                    }
                }
                
                console.log(result);
                return result;
            });
        })
        .catch(err => {
            const response = {
                success: false,
                message: `Get result fail! ${err.message}`
            };
            console.log(response);
            return response;
        });
    }
}

window.onload = (event) => {
    Ballot.initContract();
}