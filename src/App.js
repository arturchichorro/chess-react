import './App.css';
import { useReducer } from 'react';
import Board from './components/Board/Board';
import AppContext from './contexts/Context';
import { reducer } from './reducer/Reducer';
import { initGameState } from './constants';
import MovesList from './components/Control/bits/MovesList';
import TakeBack from './components/Control/bits/TakeBack';
import Control from './components/Control/Control';
import Flip from './components/Control/bits/Flip';

function App() {

  const [appState, dispatch] = useReducer(reducer, initGameState);
  const providerState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <Board />
        <Control>
          <MovesList />
          <Flip />
          <TakeBack />
        </Control>
      </div>
    </AppContext.Provider>
  );
}

export default App;
