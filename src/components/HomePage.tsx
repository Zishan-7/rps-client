import React, { useEffect, useState } from "react";
import Button from "./Button";
import Player1View from "./Player1View";
import Player2View from "./Player2View";
import { solveGame } from "@/services/contractServices";
import Loading from "./Loading";

const HomePage = () => {
  const [stage, setStage] = useState(1);
  const [winner, setWinner] = useState<number>();
  const [accounts, setaccounts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

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

        <span className="mt-6 w-full flex justify-center items-center">
          <Button
            isSelected
            className="w-56"
            text="Check Result"
            onClick={handleSolveGame}
          />
        </span>
        <p className="mt-4">
          Please switch to player 1 account before checking result
        </p>
      </div>
    </div>
  );
};

export default HomePage;
