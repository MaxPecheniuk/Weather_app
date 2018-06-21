import * as React from 'react';
import './App.scss';
import { HashRouter as Router, Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { DetailedWeather } from './components/detailedWeather/DetailedWeather';
import { Home } from './components/home/Home';

class App extends React.Component {

  render() {
    return (
      <Router>
        <main className="App">
          <Switch>
            <Route path={'/home'} render={({...props}) => <Home {...props} />}/>
            <Route path={'/city/:id'} render={({...props}) => <DetailedWeather {...props} />}/>
            <Redirect to="/home"/>
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;