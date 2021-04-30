const { ApiPromise, WsProvider } = require('@polkadot/api');
const BN = require('bn.js');

const printPretty = process.env.PRINT_PRETTY === "1";

const main = async () => {
    const wsProvider = new WsProvider('wss://rpc.kulupu.corepaper.org/ws');
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: require("./types.js"),
    });
  
    const info = await api.query.lockdrop.campaigns('NEAT');

    const targetBlockHash = await api.rpc.chain.getBlockHash(504000);
    const allLocks = await api.query.lockdrop.locks.entriesAt(targetBlockHash, 'NEAT');
    const neatAddresses = {};
  
    for (const lock of allLocks) {
      const address = lock[0].args[1].toString();
      const balance = lock[1].unwrap().balance;
      const endBlock = lock[1].unwrap().endBlock;
  
      const correctedEndBlock = BN.min(endBlock, new BN(4173120));
      const diffBlock = correctedEndBlock.sub(new BN(504000));
  
      const targetBalance = diffBlock.mul(balance).div(new BN(524160));
  
      neatAddresses[address] = targetBalance.toString(10);
    }
  
    const output = {
      addresses: neatAddresses,
      info: info,
    };
  
    if (printPretty) {
      console.log(JSON.stringify(neatAddresses, null, 4));
    } else {
      console.log(JSON.stringify(output));
    }
  
    process.exit();
  };
  
  main();
  