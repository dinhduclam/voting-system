// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Ballot {
    struct Voter {
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }

    struct Proposal {
        uint id;
        string name;   
        uint voteCount;
        uint age;
    }

    address public owner;
    mapping(address => Voter) public voters;
    uint public voterCount;
    uint public votedCount;
    Proposal[] public proposals;
    uint public proposalCount;

    event GiveRightToVote(address indexed voter);
    event Delegate(address indexed from, address indexed to);
    event Vote(address indexed from, string proposalName);
    event VotedCount(uint votedCount);

    // constructor() {
    //     owner = msg.sender;
    //     voters[owner].weight = 1;
    //     voterCount = 1;
    //     votedCount = 0;
    //     proposalCount = 0;
    // }

    constructor() {
        owner = msg.sender;
        voters[owner].weight = 1;
        voterCount = 1;
        votedCount = 0;
        proposalCount = 0;
    }

    function addProposal(string calldata name, uint age) external {
        require(
            msg.sender == owner,
            "Only owner can add proposal."
        );
        proposals.push(Proposal({
            id: ++proposalCount,
            name: name,
            voteCount: 0,
            age: age
        }));
    }

    function giveRightToVote(address voter) external {
        require(
            msg.sender == owner,
            "Only owner can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(
            voters[voter].weight == 0, 
            "The voter already had the right"
        );

        voters[voter].weight = 1;
        voterCount++;

        emit GiveRightToVote(voter);
    }
    
    function delegate(address to) external {
        Voter storage sender = voters[msg.sender];

        require(
            sender.weight != 0,
            "You have no right to vote"
        );
        require(
            !sender.voted,
            "You already voted."
        );

        require(
            to != msg.sender, 
            "Self-delegation is disallowed."
        );

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(
                to != msg.sender, 
                "Found loop in delegation."
            );
        }

        Voter storage _delegate = voters[to];

        require(
            _delegate.weight >= 1,
            "Cannot delegate to accounts that cannot vote"
        );

        // Since sender is a reference, this
        // modifies voters[msg.sender].
        sender.voted = true;
        sender.delegate = to;

        if (_delegate.voted) {
            _delegate.weight += sender.weight;
            proposals[_delegate.vote].voteCount += sender.weight;
            votedCount += sender.weight;
            emit VotedCount(votedCount);
        } else {
            _delegate.weight += sender.weight;
        }
        
        emit Delegate(msg.sender, to);
    }

    function vote(uint proposalId) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposalId;

        proposals[proposalId - 1].voteCount += sender.weight;
        votedCount += sender.weight;
        
        
        emit Vote(msg.sender, proposals[proposalId - 1].name);
        emit VotedCount(votedCount);
    }

    function getResult() public view
            returns (Proposal[] memory _proposals)
    {
        _proposals = proposals;
    }
}