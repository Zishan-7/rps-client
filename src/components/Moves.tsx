import React from "react";
import Button from "./Button";

interface MovesI {
  playerMove: number;
  setPlayerMove: React.Dispatch<React.SetStateAction<number>>;
}

const Moves: React.FC<MovesI> = ({ playerMove, setPlayerMove }) => {
  return (
    <div className="flex mt-6 w-1/2 justify-between">
      <Button
        text="Rock"
        onClick={() => setPlayerMove(1)}
        isSelected={playerMove === 1}
      />
      <Button
        text="Paper"
        onClick={() => setPlayerMove(2)}
        isSelected={playerMove === 2}
      />
      <Button
        text="Scissors"
        onClick={() => setPlayerMove(3)}
        isSelected={playerMove === 3}
      />
      <Button
        text="Spock"
        onClick={() => setPlayerMove(4)}
        isSelected={playerMove === 4}
      />
      <Button
        text="Lizard"
        onClick={() => setPlayerMove(5)}
        isSelected={playerMove === 5}
      />
    </div>
  );
};

export default Moves;
