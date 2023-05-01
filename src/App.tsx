import { Routes, Route } from "react-router-dom";

import "./App.css";
import CharactersList from "./pages/CharacterList/CharactersList";
import Character from "./pages/Character/Character";
import Search from "./pages/Search/Search";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<CharactersList />} />
        <Route path='/search' element={<Search />} />
        <Route path='/:id' element={<Character />} />
      </Routes>
    </div>
  );
}

export default App;
