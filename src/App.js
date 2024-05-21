import React from 'react';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
        <Button variant="contained" color="primary">
          My Material-UI Button
        </Button>
        <Button variant="outlined" color="secondary" size="large">
          Custom Button
        </Button>
      </header>
    </div>
  );
}

export default App;