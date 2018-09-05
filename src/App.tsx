import * as React from 'react';
import './App.scss';
import { HashRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { DetailedWeather } from './components/detailedWeather/DetailedWeather';
import { Home } from './components/home/Home';
import { NotFound } from './components/notFound/NotFound';

class App extends React.Component {

  render() {
    return (
      <Router>
        <main className="App">
          <Switch>
            <Route exact={true} path={'/'} render={({...props}) => <Home {...props} />}/>
            <Route path={'/city/:id'} render={({...props}) => <DetailedWeather {...props} />}/>
            <Route exact={true} path={'/*'} component={NotFound}/>
          </Switch>
          <div className="github-link">

            <a href={'https://github.com/MaxPecheniuk/Weather_app'}>
              <img className="github-link__img" src={require('./assets/github.png')} alt=""/>
              <span>GitHub</span>
            </a>
          </div>
        </main>

      </Router>

    );
  }
}

export default App;