import './App.css';
import React, { useEffect } from 'react';
import { Container} from '@material-ui/core';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import lazyComponentLoad from './utils/lazyComponentLoad';
import './App.css';
import Home from './main/Home';


const homeAsync = lazyComponentLoad(() => {
  return import('./main/Home');
});

function App() {

  useEffect(() => {

  }, [])
  return (

    <Router>
      <div className="App">
          <Container>
            <Home />
            {/* <Switch>
              <Route path="/home" exact component={homeAsync} />
            </Switch> */}
          </Container >
      </div>
    </Router>
  );
}

export default App;
