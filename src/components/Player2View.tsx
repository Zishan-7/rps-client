import React, { useState } from "react";
import Moves from "./Moves";
import Button from "./Button";
import { Player2Move, solveGame } from "@/services/contractServices";
import Loading from "./Loading";

interface Player2ViewI {
  accounts: string[];
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const Player2View: React.FC<Player2ViewI> = ({ accounts, setStage }) => {
  const [player2Move, setPlayer2Move] = useState<number>(0);
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (player2Move === 0) {
        alert("Please select your move");
        return;
      }
      setisLoading(true);
      await Player2Move(player2Move);
      setStage(3);
    } catch {
      alert("Some error occured");
    } finally {
      setisLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-black flex flex-col">
      <h1 className="mx-auto text-3xl font-bold">RPS GAME</h1>
      <h2 className="text-2xl mt-6 font-bold">Player 2 turn ({accounts[1]})</h2>
      <h2 className="text-xl mt-6 font-semibold">Select your move</h2>
      <Moves playerMove={player2Move} setPlayerMove={setPlayer2Move} />
      <span className="mt-6 w-1/2 flex justify-center items-center">
        <Button
          isSelected
          className="w-56"
          text="Submit"
          onClick={handleSubmit}
        />
      </span>{" "}
      <p className="mt-4">Please switch to player 2 account before playing</p>
    </div>
  );
};

export default Player2View;
