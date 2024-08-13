import React from 'react';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Product Store</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
};

export default App;
