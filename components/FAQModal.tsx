import React, { useState } from 'react';
import Modal from 'react-modal';

type FaqModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const FaqModal: React.FC<FaqModalProps> = ({ isOpen, setIsOpen }) => {
  const customStyles = {
    content: {
      
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#091B18',
      borderRadius: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '800px',
      height: '400px',
      overflow: 'scroll',
      maxWidth: '640px',
      w: 'full',
      maxW: 'screen-sm',
      h: 'auto',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      contentLabel="FAQ Modal"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col px-6 py-6">
          <h2 className="text-2xl font-bold mb-6 text-white">FAQ</h2>
          <div className="flex-1 overflow-y-scroll">
            <dl className="mx-auto max-w-2xl mb-6">
              <dt className="text-xl font-semibold text-white mb-2">
                What is LotteryHub?
              </dt>
              <dd className="text-lg text-gray-400 mb-6">
              LotteryHub is a decentralized lottery website that allows users to create and participate in lotteries.
              </dd>
                <dt className="text-xl font-semibold text-white mb-2">
                How does LotteryHub work?
                </dt>
              <dd className="text-lg text-gray-400 mb-6">
              LotteryHub uses smart contracts to facilitate the creation and participation in lotteries. Users can create a new lottery by paying a fee and specifying the terms of the lottery, such as the cost per ticket and the duration of the lottery. Other users can then purchase tickets for the lottery using cryptocurrency. When the lottery ends, a winner is randomly selected and the prize is distributed.
              </dd>
                  <dt className="text-xl font-semibold text-white mb-2">
                    How is the winner chosen?
                  </dt>
                    <dd className="text-lg text-gray-400 mb-6">
                    The winner is chosen using a random number generator. This ensures that the selection process is completely fair and unbiased.
                    </dd>
                    <dt className="text-xl font-semibold text-white mb-2">
                    How do I create a new lottery on LotteryHub?
                    </dt>
                    <dd className="text-lg text-gray-400 mb-6">
                    To create a new lottery on LotteryHub, you will need to have a cryptocurrency wallet with a sufficient balance to pay the fee for creating a new lottery. You can then use the "Create New Lottery" function in the page to specify the terms of the lottery and pay the fee.
                    </dd>


                    <dt className="text-xl font-semibold text-white mb-2">
                    How do I participate in a lottery on LotteryHub?
                    </dt>
                    <dd className="text-lg text-gray-400 mb-6">
                    To participate in a lottery on LotteryHub, you will need to have a cryptocurrency wallet with a sufficient balance to purchase a ticket. You can then use the button "Buy Ticket" available in every upcoming and active lotteries.
                    </dd>

                    <dt className="text-xl font-semibold text-white mb-2">
                    What is the minimum number of ticket sales required for a lottery to become active/start?
                    </dt>
                    <dd className="text-lg text-gray-400 mb-6">
                    The minimum number of ticket sales required for a lottery to start is two tickets from different addresses. Once the smart contract has registered the purchase of two tickets from different addresses, the lottery will start and the countdown to the end of the lottery will begin. Users will be able to continue purchasing tickets until the maximum number of tickets is reached or the end of the lottery period is reached, whichever occurs first.
                    </dd>

                    <dt className="text-xl font-semibold text-white mb-2">
                    Is LotteryHub fair?
                    </dt>
                    <dd className="text-lg text-gray-400 mb-6">
                    Yes, LotteryHub is designed to be fair for all participants. The random selection process for determining the winners is transparent and unbiased, and the smart contracts that facilitate the lotteries are open-source and available for review.
                    </dd>

                    <dt className="text-xl font-semibold text-white mb-2">
                    Is my information on LotteryHub secure?
                    </dt>
                    <dd className="text-lg text-gray-400 mb-6">
                    Yes, LotteryHub is a decentralized platform that does not collect or store any personal information about its users. All transactions on the platform are conducted using cryptocurrency, which adds an additional layer of security and anonymity.
                    </dd>

                    <dt className="text-xl font-semibold text-white mb-2">
                    Are there any fees associated with using LotteryHub?
                    </dt>
                    <dd className="text-lg text-gray-400 mb-6">
                    Yes, there are fees associated with using LotteryHub. There is a fee for creating a new lottery, and a percentage of the ticket sales for each lottery goes to the owner of the lottery.
                    </dd>




                    </dl>
                    </div>
                    </div>

                    <button
                    className="btn-secondary absolute top-0 right-0 m-4 text-3xl font-bold text-white "
                    onClick={() => setIsOpen(false)}
                    >
                    X
                    </button>

                    </div>
                    </Modal>
);
};

export default FaqModal;
