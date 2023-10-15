import { BrowserProvider, ethers } from "ethers";
import { RPSAbi } from "../contracts/RPS";
import { HasherAbi } from "../contracts/Hasher";
import { estimateGasFee } from "@/utils/getEstimatedGasFee";

let RpsContractAddress: string | undefined;
let stake = "";
let player1Move = 0,
  player2Move = 0;

let player2Played = false;
let currentAccountAddress = "";
let player1Address = "",
  player2Address = "";

let lastAction = new Date();

export const startGame = async (_stake: string, move: number) => {
  try {
    stake = _stake;
    player1Move = move;
    const HasherContractAddress = process.env
      .NEXT_PUBLIC_HASHER_ADDRESS as string;
    const RPSByteCode =
      "608060405261012c600555604051604080610aaf833981018060405281019080805190602001909291908051906020019092919050505034600481905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600281600019169055504260068190555050506109ce806100e16000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c4395b9146100bf578063294914a4146101145780633a4b66f11461012b57806348e257cb146101565780634d03e3d21461018f57806353a04b05146101c257806380985af9146101e557806389f71d531461023c578063a5ddec7c14610267578063c37597c6146102a1578063c8391142146102f8578063f56f48f21461030f575b600080fd5b3480156100cb57600080fd5b506100fa600480360381019080803560ff169060200190929190803560ff16906020019092919050505061033a565b604051808215151515815260200191505060405180910390f35b34801561012057600080fd5b50610129610403565b005b34801561013757600080fd5b506101406104ae565b6040518082815260200191505060405180910390f35b34801561016257600080fd5b5061016b6104b4565b6040518082600581111561017b57fe5b60ff16815260200191505060405180910390f35b34801561019b57600080fd5b506101a46104c7565b60405180826000191660001916815260200191505060405180910390f35b6101e3600480360381019080803560ff1690602001909291905050506104cd565b005b3480156101f157600080fd5b506101fa6105c0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561024857600080fd5b506102516105e6565b6040518082815260200191505060405180910390f35b34801561027357600080fd5b5061029f600480360381019080803560ff169060200190929190803590602001909291905050506105ec565b005b3480156102ad57600080fd5b506102b66108c7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561030457600080fd5b5061030d6108ec565b005b34801561031b57600080fd5b5061032461099c565b6040518082815260200191505060405180910390f35b600081600581111561034857fe5b83600581111561035457fe5b141561036357600090506103fd565b6000600581111561037057fe5b83600581111561037c57fe5b141561038b57600090506103fd565b600282600581111561039957fe5b8115156103a257fe5b0660028460058111156103b157fe5b8115156103ba57fe5b0614156103e1578160058111156103cd57fe5b8360058111156103d957fe5b1090506103fd565b8160058111156103ed57fe5b8360058111156103f957fe5b1190505b92915050565b6000600581111561041057fe5b600360009054906101000a900460ff16600581111561042b57fe5b14151561043757600080fd5b600554600654014211151561044b57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050506000600481905550565b60045481565b600360009054906101000a900460ff1681565b60025481565b600060058111156104da57fe5b600360009054906101000a900460ff1660058111156104f557fe5b14151561050157600080fd5b6000600581111561050e57fe5b81600581111561051a57fe5b1415151561052757600080fd5b6004543414151561053757600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561059357600080fd5b80600360006101000a81548160ff021916908360058111156105b157fe5b02179055504260068190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b600060058111156105f957fe5b82600581111561060557fe5b1415151561061257600080fd5b6000600581111561061f57fe5b600360009054906101000a900460ff16600581111561063a57fe5b1415151561064757600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106a257600080fd5b600254600019168282604051808360058111156106bb57fe5b60ff167f01000000000000000000000000000000000000000000000000000000000000000281526001018281526020019250505060405180910390206000191614151561070757600080fd5b61072082600360009054906101000a900460ff1661033a565b15610786576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f19350505050506108bb565b61079f600360009054906101000a900460ff168361033a565b1561080657600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f19350505050506108ba565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f1935050505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050505b5b60006004819055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060058111156108f957fe5b600360009054906101000a900460ff16600581111561091457fe5b1415151561092157600080fd5b600554600654014211151561093557600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f19350505050506000600481905550565b600554815600a165627a7a723058203e1a698e884628fd59b22ad8acfe11760baecd687b5bc1f91acf539455b3c6aa0029";

    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const hasherContract = new ethers.Contract(
      HasherContractAddress,
      HasherAbi,
      signer
    );
    const accounts = await (window as any).ethereum.request({
      method: "eth_accounts",
    });

    const hash = await hasherContract.hash(move, process.env.NEXT_PUBLIC_SALT);

    const contractABI = RPSAbi;

    const contractFactory = new ethers.ContractFactory(
      contractABI,
      RPSByteCode,
      signer
    );

    const gasEstimate = await estimateGasFee();

    const contract = await contractFactory.deploy(hash, accounts[1], {
      value: ethers.parseEther(stake),
      gasLimit: 6000000,
      maxPriorityFeePerGas: ethers.parseUnits(
        String(Math.ceil(gasEstimate.maxPriorityFeePerGas)),
        "gwei"
      ),
      maxFeePerGas: ethers.parseUnits(
        String(Math.ceil(gasEstimate.maxFeePerGas)),
        "gwei"
      ),
    });
    await contract.waitForDeployment();
    RpsContractAddress = contract.target.toString();
    player1Address = signer.address;
    currentAccountAddress = signer.address;
    lastAction = new Date();
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
};

export const Player2Move = async (move: number) => {
  try {
    if (!RpsContractAddress) {
      alert("Contract not deployed yet");
      return;
    }
    player2Move = move;
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const rpsContract = new ethers.Contract(
      RpsContractAddress.toString(),
      RPSAbi,
      signer
    );

    const gasEstimate = await estimateGasFee();

    const txn = await rpsContract.play(move, {
      value: ethers.parseEther(stake),
      gasLimit: 6000000,
      maxPriorityFeePerGas: ethers.parseUnits(
        String(Math.ceil(gasEstimate.maxPriorityFeePerGas)),
        "gwei"
      ),
      maxFeePerGas: ethers.parseUnits(
        String(Math.ceil(gasEstimate.maxFeePerGas)),
        "gwei"
      ),
    });
    await txn.wait();
    player2Played = true;
    player2Address = signer.address;
    lastAction = new Date();
  } catch (e) {
    console.error(e);
  }
};

export const solveGame = async () => {
  try {
    if (!RpsContractAddress || !player2Played) {
      alert("Contract not deployed yet");
      return;
    }
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const rpsContract = new ethers.Contract(
      RpsContractAddress.toString(),
      RPSAbi,
      signer
    );

    const txnRes = await rpsContract.solve(
      player1Move,
      process.env.NEXT_PUBLIC_SALT
    );

    await txnRes.wait();
    lastAction = new Date();
    return selectWinner();
  } catch (e) {
    console.error(e);
  }
};

const selectWinner = () => {
  if (player1Move > player2Move) {
    return 1;
  }
  if (player1Move < player2Move) {
    return 2;
  }
  return 0;
};

// only player 2 can call this
export const player1Timeout = async () => {
  try {
    if (!RpsContractAddress) {
      alert("Contract not deployed yet");
      return;
    }
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const rpsContract = new ethers.Contract(
      RpsContractAddress.toString(),
      RPSAbi,
      signer
    );

    if (signer.address === player1Address) {
      throw new Error("Connect to player 2 account");
    }

    const txnRes = await rpsContract.j1Timeout();

    await txnRes.wait();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// only player 1 can call this
export const player2Timeout = async () => {
  try {
    if (!RpsContractAddress) {
      alert("Contract not deployed yet");
      return;
    }
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const rpsContract = new ethers.Contract(
      RpsContractAddress.toString(),
      RPSAbi,
      signer
    );

    if (currentAccountAddress !== player1Address) {
      throw new Error("Connect to player 1 account");
    }

    const txnRes = await rpsContract.j2Timeout();

    await txnRes.wait();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const setCurrentWalletAddress = async () => {
  const provider = new BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  currentAccountAddress = signer.address;
};

export const getCurrentWalletAddress = () => {
  return currentAccountAddress;
};

export const getPlayersAddress = () => {
  return {
    player1Address,
    player2Address,
  };
};

export const getLastAction = () => {
  return lastAction;
};
