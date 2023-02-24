import React from 'react';
import './App.css';
import CardList from './components/CardList';
import { CardsProvider } from './context/cardContext/cardContext';

function App() {
  return (
    <div className="App">
      <CardsProvider>
        <CardList />
      </CardsProvider>


    </div>
  );
}

export default App;
