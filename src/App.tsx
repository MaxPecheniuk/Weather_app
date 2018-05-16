import * as React from 'react';
import './App.scss';
import { HashRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { DetailedWeather } from './components/detailedWeather/DetailedWeather';
import { Home } from './components/home/Home';
// import { CurrentWeatherCitiesList } from './components/citiesList/CurrentWeatherCitiesList';

class App extends React.Component {

  render() {
    return (
      <Router>
        <main className="App">
          <Switch>
            <Route path={'/city/:id'} render={({...props}) => <DetailedWeather {...props} />}/>
            <Route path={'/'} render={({...props}) => <Home {...props} />}/>
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;