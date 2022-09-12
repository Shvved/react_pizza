import { Routes, Route } from 'react-router-dom';
import { Context } from 'react';

import './scss/app.scss';
import Header from './components/header/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { createContext, useState } from 'react';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
