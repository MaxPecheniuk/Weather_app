import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { currentCityStore } from './CurrentCity.store';
import { CurrentCityItemMain } from './CurrentCityItemMain';
import { CurrentCityItemDetails } from './CurrentCityItemDetails';
import './CurrentCity.scss';

@observer
export class CurrentCity extends React.Component {

  componentDidMount() {
    currentCityStore.getGeoData();
  }

  render() {
    const {currentCityWeather} = currentCityStore;

    if (currentCityStore.currentCityWeather === undefined) {
      return (<div> Loading data ...</div>);
    }

    return (
      <div className="current-city">
        <Link to={'/city/' + currentCityWeather.id}>
          <div className="current-city_wrapper">
            <CurrentCityItemMain weatherData={currentCityWeather}/>
            <CurrentCityItemDetails weatherData={currentCityWeather}/>
          </div>
        </Link>
      </div>
    );
  }
}