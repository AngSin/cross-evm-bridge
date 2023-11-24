import {
  AddressLike,
  BigNumberish,
  Contract,
  WebSocketProvider,
  formatEther,
  Wallet,
  JsonRpcProvider,
} from "ethers";
import { Bridge__factory } from "./typechain-types";
import * as dotenv from "dotenv";

dotenv.config();

const sepoliaProvider = new WebSocketProvider(
  process.env.SEPOLIA_WS_RPC_URL!!,
  {
    name: "sepolia",
    chainId: 11155111,
  },
);

const sepoliaBridgeContract = new Contract(
  process.env.SEPOLIA_BRIDGE_ADDRESS!!,
  Bridge__factory.abi,
  sepoliaProvider,
);

console.log("bot listening!");

sepoliaBridgeContract.on(
  "Deposit",
  async (depositor: AddressLike, amount: BigNumberish) => {
    const provider = new JsonRpcProvider(process.env.MUMBAI_RPC_URL!!, {
      name: "mumbai",
      chainId: 80001,
    });
    const sender = new Wallet(process.env.PRIVATE_KEY!!, provider);
    const bridge = Bridge__factory.connect(
      process.env.MUMBAI_BRIDGE_ADDRESS!!,
      sender,
    );
    console.log(`sending ${formatEther(amount)} tokens to ${depositor}`);
    await bridge.release(depositor, amount);
    console.log(
      `sent ${formatEther(amount)} tokens to ${depositor} on Mumbai contract: ${
        process.env.MUMBAI_BRIDGE_ADDRESS
      }`,
    );
  },
);
