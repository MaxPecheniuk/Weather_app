import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { currentWeatherStore } from '../currentWeather/CurrentWeather.store';
import { CurrentWeatherTypes } from '../../types/currentWeather.types';
import { CurrentWeatherCityItem } from '../currentWeather/CurrentWeatherCityItem';
import { CurrentWeatherCitiesList } from '../currentWeather/CurrentWeatherCitiesList';

import './Home.scss';

@observer
export class Home extends React.Component {

  componentDidMount() {
    currentWeatherStore.getData();
  }

  render() {
    let cityItem = null;
    if (currentWeatherStore.currentWeather !== undefined) {
      cityItem = currentWeatherStore.currentWeather.map((items: CurrentWeatherTypes, i) => {
        // const weatherIcon = items.weather.map((item) => item.icon);
        // const weatherDescription = items.weather.map((item) => item.description);
        return (
          <Link to={'/city/' + items.id} key={i}>
            <CurrentWeatherCityItem
              weatherData={items}
              // weatherIcon={weatherIcon.join('')}
              // weatherDescription={weatherDescription.join('')}
            />
          </Link>);
      });
    }
    return (
      <div className="home">
        <h1>Weather and forecasts</h1>
        <h3>Select a city to view the weather forecast</h3>
        <CurrentWeatherCitiesList>
          {cityItem}
        </CurrentWeatherCitiesList>
      </div>
    );
  }
}