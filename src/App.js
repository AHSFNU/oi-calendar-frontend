import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import Title from './Title';
import ContestSet from './ContestSet';

function App() {
  return (
    <div className="App">
      <Title />
      <Container>
        <ContestSet />
      </Container>
    </div>
  );
}

export default App;
