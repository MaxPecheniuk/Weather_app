import * as React from 'react';
import './CurrentCity.scss';
import { currentCityStore } from './CurrentCity.store';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { CurrentCityItemMain } from './CurrentCityItemMain';
import { CurrentCityItemDetails } from './CurrentCityItemDetails';

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
      <Link to={'/city/' + currentCityWeather.id}>

        <div className="current-city_wrapper">
          <CurrentCityItemMain weatherData={currentCityWeather}/>
          <CurrentCityItemDetails weatherData={currentCityWeather}/>
        </div>
      </Link>

    );
  }
}