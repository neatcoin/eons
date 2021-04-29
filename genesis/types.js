module.exports = {
    Address: 'MultiAddress',
    LookupSource: 'MultiAddress',
    Difficulty: 'U256',
    DifficultyAndTimestamp: {
      difficulty: 'Difficulty',
      timestamp: 'Moment'
    },
    Era: {
      genesisBlockHash: 'H256',
      finalBlockHash: 'H256',
      finalStateRoot: 'H256'
    },
    CampaignIdentifier: '[u8; 4]',
    CampaignInfo: {
      endBlock: 'BlockNumber',
      minLockEndBlock: 'BlockNumber',
      childroot: 'Option<Vec<u8>>',
    },
    LockInfo: {
      balance: 'Balance',
      endBlock: 'BlockNumber',
    },
  };
  