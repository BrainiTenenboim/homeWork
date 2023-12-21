import React, { useState } from 'react';
import UsersTable from './components/UsersTable/UsersTable';
import Loader from './components/Loader/Loader';
import './App.css';

const App = () => {
  const [showLoader, setShowLoader] = useState(false);

  const setLoader = (value) => {
    setShowLoader(value);
  };

  return (
    <div>
      <header className="header"></header>
      <main className="main">
        <UsersTable setLoader={setLoader}></UsersTable> {/* Render the UsersTable component and pass the setLoader function as a prop */}
        {showLoader && <Loader></Loader>} {/* Render the Loader component conditionally based on the showLoader state */}
      </main>
      <footer className="footer"></footer>
    </div>
  );
};

export default App;