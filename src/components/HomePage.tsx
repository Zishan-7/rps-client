import React, { useEffect, useState } from "react";
import Button from "./Button";
import Player1View from "./Player1View";
import Player2View from "./Player2View";
import {
  getCurrentWalletAddress,
  getPlayersAddress,
  player1Timeout,
  solveGame,
} from "@/services/contractServices";
import Loading from "./Loading";

const HomePage = () => {
  const [stage, setStage] = useState(1);
  const [winner, setWinner] = useState<number>();
  const [accounts, setaccounts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const player1Address = getPlayersAddress().player1Address;

  useEffect(() => {
    getAccountsAddress();
  }, []);

  const getAccountsAddress = async () => {
    //@ts-ignore
    const accs = await window.ethereum.request({
      method: "eth_accounts",
    });

    setaccounts(accs);
  };

  const handleSolveGame = async () => {
    if (player1Address !== getCurrentWalletAddress()) {
      alert("Please switch to Player 1 account to solve the game");
      return;
    }
    try {
      setisLoading(true);
      const res = await solveGame();
      setWinner(res);
    } catch {
      alert("Some error occured");
    } finally {
      setisLoading(false);
    }
  };

  const handlePlayer1Timeout = async () => {
    try {
      if (player1Address === getCurrentWalletAddress()) {
        alert("Please switch to player 2 account");
        return;
      }
      setisLoading(true);
      await player1Timeout();
      setisLoading(false);
      setStage(1);
    } catch (err) {
      console.log(err);
    }
  };

  if (stage === 1) {
    return <Player1View setStage={setStage} accounts={accounts} />;
  }

  if (stage === 2) {
    return <Player2View setStage={setStage} accounts={accounts} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex gap-x-5">
      <div className="text-black flex flex-col  w-1/2">
        <h1 className="mx-auto text-3xl font-bold">RPS GAME</h1>
        {winner && (
          <h2 className="text-2xl mt-6 font-bold">
            {winner === 0 ? "Game tied!" : ` Congrats! Player ${winner} won`}
          </h2>
        )}

        <span className="mt-6 w-full flex-col flex justify-center items-center">
          <Button
            isSelected
            className="w-56"
            text="Check Result"
            onClick={handleSolveGame}
          />
          <p className="mt-4">
            Player 1 not responding?{" "}
            <span
              onClick={handlePlayer1Timeout}
              className="underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
