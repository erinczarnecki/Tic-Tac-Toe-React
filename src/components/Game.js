import React, { useState }  from 'react'
import Board from './Board'
import { calculateWinner } from '../helpers';

const style = {
  width: '200px',
  margin: '20px auto'
};

const listStyle = {
  listStyle: 'none'

}

const Game = () => {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  const handleClick = i => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];

    // If user clicks on an occupied square or if the game is over, return
    if (winner || squares[i]) return;

    // Put a value in the clicked square
    squares[i] = xIsNext ? 'X' : 'O';

    //TODO: style winning squares
    //TODO: Make 'New Game' Button

    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext);
  }

  const jumpTo = step => {
    setStepNumber(step);
    setXisNext(step % 2 === 0)
  };

  
  const renderMoves = () => (
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Go to start';
      return (
        <li style={listStyle} key={move}>
          <button onClick={() => jumpTo(move)}>
            {destination}
          </button>


        </li>
      )
    })
    
    
      )

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />  
      <div style={style}>
        <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')}</p>
        {renderMoves()}
      </div>
    </>
    
  )
}

export default Game
