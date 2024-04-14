import './App.css';

import RickAndMortyCharacterMultiSelect from 'components/RickAndMortyCharacterMultiSelect';
import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="main">
        <RickAndMortyCharacterMultiSelect
          errorComponent={({ errorMessage, retryRequest }) => (
            <div className="error-container">
              <p className="error-message-title">Failed to load options:</p>
              <p className="error-message">{errorMessage}</p>
              <button onClick={retryRequest} className="retry-button">
                Retry
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default App;
