import Button from "@/components/Button";
import HomePage from "@/components/HomePage";
import { setCurrentWalletAddress } from "@/services/contractServices";
import { BrowserProvider } from "ethers";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [walletConnected, setwalletConnected] = useState(false);
  const [walletsConnected, setwalletsConnected] = useState([]);

  const connectToMetaMask = async () => {
    // @ts-ignore
    if (typeof window.ethereum !== "undefined") {
      try {
        // @ts-ignore
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // @ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        // @ts-ignore
        if (accounts?.length >= 2) {
          const player1Address = accounts[0];
          const player2Address = accounts[1];
          return { player1Address, player2Address };
        } else {
          alert("Please connect at least two Ethereum accounts in MetaMask.");
          return { player1Address: null, player2Address: null };
        }
      } catch (error) {
        alert("Error connecting to MetaMask:");
        return { player1Address: null, player2Address: null };
      }
    } else {
      alert("MetaMask is not available in your browser");
      return { player1Address: null, player2Address: null };
    }
  };

  const checkConnectedWallets = async () => {
    const accounts = await (window as any).ethereum.request({
      method: "eth_accounts",
    });
    setwalletsConnected(accounts);
    if (accounts.length == 2) {
      setwalletConnected(true);
    } else {
      setwalletConnected(false);
    }
  };

  useEffect(() => {
    checkConnectedWallets();
    (window as any).ethereum.on("accountsChanged", () => {
      checkConnectedWallets();
      setCurrentWalletAddress();
    });
  }, []);

  return (
    <main className={`${inter.className} bg-white h-screen w-screen p-6`}>
      <Head>
        <title>RPS Game</title>
      </Head>
      {walletConnected ? (
        <HomePage />
      ) : (
        <>
          <div className="h-screen w-screen flex flex-col justify-center items-center">
            <Button
              isSelected
              text="Connect wallet"
              onClick={connectToMetaMask}
            />
            <p className="mt-4 text-black">
              {walletsConnected.length === 0
                ? "Connect two accounts to start playing the game" +
                  walletsConnected.length
                : "Connect one more account"}
            </p>
          </div>
        </>
      )}
    </main>
  );
}
