import * as React from 'react';
import './App.scss';
import { HashRouter as Router, Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { DetailedWeather } from './components/detailedWeather/DetailedWeather';
import { Home } from './components/home/Home';
// import { NotFound } from './components/notFound/NotFound';
// import { SearchForm } from './components/searchForm/SearchForm';

class App extends React.Component {

  render() {
    return (
      <Router>
        <main className="App">
          <Switch>
            {/*<SearchForm/>*/}
            {/*<Route exact={true} path={'/'} render={({...props}) => <SearchForm {...props} />}/>*/}

            <Route path={'/home'} render={({...props}) => <Home {...props} />}/>
            <Route path={'/city/:id'} render={({...props}) => <DetailedWeather {...props} />}/>
            {/*<Route exact={true} path={'/*'} component={NotFound}/>*/}
            <Redirect to="/home"/>
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;