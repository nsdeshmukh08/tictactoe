import React, {useState, useEffect} from 'react'

import './TicTacToe.css';

function TicTacToe() {

  const [player, setPlayer] = useState('X')
  const [cellArr, setCellArr] = useState(new Array(9).fill(''));
  const [xWinCount, setxWinCount] = useState(0);
  const [oWinCount, setoWinCount] = useState(0);

  useEffect(() => {
    checkWinner();
  }, [player]);

  useEffect(() => {
    const allCellFilled = cellArr.every(e => e);
    if(allCellFilled){
      alert("Game Over");
      resetState();
    }
  }, [JSON.stringify(cellArr)]);

  const resetState = () => {
    setCellArr(new Array(9).fill(''));
    setPlayer('X');
  }

  const checkWinner = () => {
    const winnerObj = {
      row: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
      ],
      col: [
        [0,3,4],
        [1,4,7],
        [6,7,8],
      ],
      dia: [
        [0,4,8],
        [2,4,6],
      ]
    }

    for( let key in winnerObj) {

       for(let i = 0; i<winnerObj[key].length; i++){
          const xPlayer =winnerObj[key][i].every(e => cellArr[e] === 'X');

          if(xPlayer){
            alert("X is winner");
            setxWinCount(prev => prev + 1);
            resetState();
            return;
          }

          const oPlayer =winnerObj[key][i].every(e => cellArr[e] === 'O');
          if(oPlayer){
            alert("O is winner");
            setoWinCount(prev => prev + 1);
            resetState();
            return;
          }
       }
    }
  }

  const onCellClick = (num) => {
    const cellArrClone = [...cellArr];
    if(!cellArrClone[num]){
      cellArrClone[num] = player;


      setPlayer((lastPlayer) => {
        if(lastPlayer === 'X') return 'O';
        if(lastPlayer === 'O') return 'X';
      });

      setCellArr(cellArrClone);
    }
    
  }

  const Cell = ({num}) => {
    return <td onClick={onCellClick.bind(null,num)}> <span>{cellArr[num]}</span> </td>
  }

  return (
    <>
    <h2 className='heading'>Tic Tac Toe</h2>
    <h3 className='player'>Current Player - {player}</h3>
    <div className='container'>
      <table>
        <tbody>
          <tr>
            <Cell num={0}/>
            <Cell num={1}/>
            <Cell num={2}/>
          </tr>
          <tr>
            <Cell num={3}/>
            <Cell num={4}/>
            <Cell num={5}/>
          </tr>
          <tr>
            <Cell num={6}/>
            <Cell num={7}/>
            <Cell num={8}/>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 className='player'>X Winning Count - {xWinCount}</h3>
    <h3 className='player'>O Winning Count - {oWinCount}</h3>
    </>
  )
}

export default TicTacToe
