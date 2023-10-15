import React, { useState } from "react";
import Moves from "./Moves";
import Button from "./Button";
import {
  Player2Move,
  getCurrentWalletAddress,
  getLastAction,
  getPlayersAddress,
  player1Timeout,
  player2Timeout,
} from "@/services/contractServices";
import Loading from "./Loading";

interface Player2ViewI {
  accounts: string[];
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const Player2View: React.FC<Player2ViewI> = ({ accounts, setStage }) => {
  const [player2Move, setPlayer2Move] = useState<number>(0);
  const [isLoading, setisLoading] = useState(false);

  const player1Address = getPlayersAddress().player1Address;

  const handleSubmit = async () => {
    try {
      if (player1Address === getCurrentWalletAddress()) {
        alert("Please switch to player 2 account");
        return;
      }
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

  const handlePlayer2Timeout = async () => {
    try {
      if (player1Address !== getCurrentWalletAddress()) {
        alert("Please switch to player 1 account");
        return;
      }

      const lastAction = getLastAction();

      lastAction.setMinutes(getLastAction().getMinutes() + 5);

      if (lastAction > new Date()) {
        alert(
          "Timeout funtion can only be called after 5 minutes of inactivity"
        );
        return;
      }

      setisLoading(true);
      await player2Timeout();
      setisLoading(false);
      setStage(1);
    } catch (err) {
      console.log(err);
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
      <span className="mt-6 w-1/2 flex flex-col justify-center items-center">
        <Button
          isSelected
          className="w-56"
          text="Submit"
          onClick={handleSubmit}
        />
        <p className="mt-4">
          Player 2 not responding?
          <span
            onClick={handlePlayer2Timeout}
            className="underline cursor-pointer"
          >
            Click here
          </span>
        </p>
      </span>
    </div>
  );
};

export default Player2View;
