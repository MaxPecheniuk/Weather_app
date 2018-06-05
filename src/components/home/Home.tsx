import * as React from 'react';
import { observer } from 'mobx-react';
import { currentWeatherStore } from '../currentWeather/CurrentWeather.store';
import { CurrentWeatherTypes } from '../../types/currentWeather.types';
import { CurrentWeatherCityItem } from '../currentWeather/CurrentWeatherCityItem';
import { CurrentWeatherCitiesList } from '../currentWeather/CurrentWeatherCitiesList';

import './Home.scss';
import { SearchForm } from '../searchForm/SearchForm';

@observer
export class Home extends React.Component {
  componentDidMount() {
    // currentWeatherStore.getData();
  }

  render() {
    let cityItem = null;
    if (currentWeatherStore.currentWeather !== undefined) {
      cityItem = currentWeatherStore.currentWeather.map((items: CurrentWeatherTypes, i) => {
        return (
            <CurrentWeatherCityItem
              key={i}
              weatherData={items}
            />);
      });
    }
    return (
      <div className="home">
        <h1>Weather and forecasts</h1>
        <h3>Select a city to view the weather forecast</h3>
        <SearchForm/>
        <CurrentWeatherCitiesList>
          {cityItem}
        </CurrentWeatherCitiesList>
      </div>
    );
  }
}