// SPDX-License-Identifier: GPL-3.0

import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

pragma solidity ^0.8.0;


contract LotteryHub is ReentrancyGuard {

  address public HubOwner;
  uint256 public CreatedLotterys;
  uint256 public CostPerLottery;
  address public FeesAddress;
  
  struct LotteryStruct {
    uint256 LotteryId;
    address Owner;
    uint256 Fees;
    uint256 CostPerTicket;
    address [] Tickets;
    uint256 Duration;
    uint256 MaxTickets;
    bool isActive;
  }
  
  mapping(uint256 => LotteryStruct) private lotteryStructs;
  mapping(address => uint256) public winnings; // maps the winners to there winnings
  mapping(address => uint256) public LotteryCreatorFees; // maps the lottery creators to fees commision

      constructor(address _HubOwner) {
        HubOwner = _HubOwner;
        CreatedLotterys = 0;
        CostPerLottery = 0.05 ether;
        FeesAddress = _HubOwner;
      }

      event LotteryWinners(
        uint256 lotteryNumb,
        address Winner,
        uint256 amountWon
      );

      modifier isOwner() {
        require((msg.sender == HubOwner),"Caller dont't have permissions");
        _;
    }

      modifier isOperator(uint256 _LotteryKey) {
        require((msg.sender == lotteryStructs[_LotteryKey].Owner || msg.sender == HubOwner),"Caller dont't have permissions");
        _;
    }

  function newLottery(uint256 _Fees, uint256 _CostPerTicket, uint256 _Duration, uint256 _MaxTickets) public returns(uint256 index) {
    uint256 lotteryNumb = CreatedLotterys++;
    address [] memory ticketsArray;
    lotteryStructs[lotteryNumb].LotteryId = lotteryNumb;
    lotteryStructs[lotteryNumb].Owner   = msg.sender;
    lotteryStructs[lotteryNumb].Fees   = _Fees;
    lotteryStructs[lotteryNumb].CostPerTicket = _CostPerTicket;
    lotteryStructs[lotteryNumb].Tickets = ticketsArray;
    lotteryStructs[lotteryNumb].Duration = block.timestamp + _Duration;
    lotteryStructs[lotteryNumb].MaxTickets = _MaxTickets;
    lotteryStructs[lotteryNumb].isActive = true;

    return lotteryStructs[lotteryNumb].LotteryId;
  }

  function getAllLottery() public view returns (LotteryStruct[] memory) {

        LotteryStruct[] memory items = new LotteryStruct[](CreatedLotterys);

        for(uint i = 0; i < CreatedLotterys; i++) {
            uint lotteryID = i;
            LotteryStruct storage currentLottery = lotteryStructs[lotteryID];
            items[lotteryID] = currentLottery;
            lotteryID += 1;
        }

        return items;
  }

  function GetLotteryTickets(uint256 _LotteryKey) public view returns (address[] memory) {
        return lotteryStructs[_LotteryKey].Tickets;
  }

  function BuyTickets(uint256 _LotteryKey) public payable nonReentrant{
        uint256 Cost = lotteryStructs[_LotteryKey].CostPerTicket * 1 ether;
        require( msg.value % Cost == 0 , "");
        uint256 numOfTicketsToBuy = msg.value / Cost;
        require((numOfTicketsToBuy <= RemainingTickets(lotteryStructs[_LotteryKey].LotteryId)),"No tickets available");

        for (uint256 i = 0; i < numOfTicketsToBuy; i++) {
            lotteryStructs[_LotteryKey].Tickets.push(msg.sender);
        }
  }
  
  function DrawWinnerTicket(uint256 _LotteryKey) public isOperator(_LotteryKey) nonReentrant{
        require(lotteryStructs[_LotteryKey].Tickets.length > 0, "No tickets were purchased");
        bytes32 blockHash = blockhash(block.number - lotteryStructs[_LotteryKey].Tickets.length);
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, blockHash)));
        uint256 winningTicket = randomNumber % lotteryStructs[_LotteryKey].Tickets.length;
        address winner = lotteryStructs[_LotteryKey].Tickets[winningTicket];

        winnings[winner] += (lotteryStructs[_LotteryKey].Tickets.length * (lotteryStructs[_LotteryKey].CostPerTicket - lotteryStructs[_LotteryKey].Fees));
        LotteryCreatorFees[lotteryStructs[_LotteryKey].Owner] += (lotteryStructs[_LotteryKey].Tickets.length * lotteryStructs[_LotteryKey].Fees);
        lotteryStructs[_LotteryKey].isActive=false;
        emit LotteryWinners(_LotteryKey, winner, winnings[winner]);
      
  }

  function RemainingTickets(uint256 _LotteryKey) public view returns (uint256) {
        return lotteryStructs[_LotteryKey].MaxTickets - lotteryStructs[_LotteryKey].Tickets.length;
  }
  
  function IsWinner() public view returns (bool) {
        return winnings[msg.sender] > 0;
  }

  function setCostPerLottery(uint256 _CostPerLottery) public isOwner {
        CostPerLottery = _CostPerLottery;
  }
  
  function setFeesAddress(address _FeesAddress) public isOwner {
        FeesAddress = _FeesAddress;
  }

  function setHubOwner(address _HubOwner) public isOwner {
        HubOwner = _HubOwner;
  }

  function getHubOwnerComissions(address _HubOwner) public isOwner {
        address payable comissionsAddress = payable(FeesAddress);
        uint256 reward2Transfer = LotteryCreatorFees[FeesAddress];
                LotteryCreatorFees[FeesAddress] = 0;

        comissionsAddress.transfer(reward2Transfer);

        HubOwner = _HubOwner;
  }

}