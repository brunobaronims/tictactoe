import { useState } from "react";
import Board from "../Board";

export default function Game() {
    const [turn, setTurn] = useState(true);
    
    const nextPlayer = turn ? 'X' : 'O';

    const [squares, setSquares] = useState(Array(9).fill(null));
    let [history, setHistory] = useState(Array(1).fill(squares));
    const [count, setCount] = useState(0);
    const [position, setPosition] = useState(Array(1).fill(null));
    
    let col, row = 0;
    let tableIndex = Array(9).fill(null);
    tableIndex.map((item, index) => {
        if (index === 0 || index === 3 || index === 6) {
            row++;
            col = 0;
        }
        col++;
        return (
            tableIndex[index] = [col - 1, row - 1]
        )
    });

    history = history.slice(0, count + 1);
    const current = history[count];

    const moves = history.slice(1, count + 1).map((step, move) => {
        const desc = (move > 0) ?
            'Go to move #' + move + ` (${position[move - 1]})` : 
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    function handleClick(index) {
        const array = current.slice()
        if (calculateWinner(array) || array[index]) {
            return;
        } else {
            setTurn(!turn);
        }
        
        array[index] = nextPlayer;
        setCount(history.length);
        setHistory(history.concat([array]));
        setSquares(array);
        if (count === 0) {
            setPosition([tableIndex[index]]);
        } else {
            setPosition(position.concat([tableIndex[index]]));
        }
    }
    
    function jumpTo(move) {
        setCount(move);
        setTurn((move % 2) === 0);
    }

    const winner = calculateWinner(current);
    let status;
    if (winner) {
        status = `Winner: ${winner}!`
    } else if (count==9) {
        status = `Draw!`
    } else {
        status = `Next player: ${nextPlayer}`
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board click={handleClick} squares={current}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            <div className="sort-button">
                
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }