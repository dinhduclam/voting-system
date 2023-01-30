import Web3 from 'web3';
import * as Ballot from './contracts/Ballot.json'

async function init() {
    console.log('ancd')
    const web3 = new Web3('ws://127.0.0.1:7545/');
    const contract = await new web3.eth.Contract(Ballot.abi, '0x65fca575DD78980Ca8272C3E024fC4e0F52C5F6c');

    // contract.events.GiveRightToVote({fromBlock: 0})
    //     .on('data', event => console.log(event))
    //     .on('changed', changed => console.log(changed))
    //     .on('error', err => console.log(err))
    //     .on('connected', str => console.log(str))

    console.log(contract)
    // await contract.methods.giveRightToVote('0x09bAA161Fc9c7a0fB469DFD64675d041Ea07B54A').send({from: '0xb1Dfc17A255Af7c5cE44e0dD863e99B5f554fc37'});

    // await contract.methods.giveRightToVote('0x5c79aC253979D471Ea1Dcbb62a2D4c41EeA6C732').send({from: '0xb1Dfc17A255Af7c5cE44e0dD863e99B5f554fc37'});

    

    
    //proposal = await contract.methods.winningProposal().call();

    // console.log(owner.events);
}