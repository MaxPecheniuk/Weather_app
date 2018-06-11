import * as React from 'react';
import { observer } from 'mobx-react';
import { defaultCitiesStore } from '../defaultCities/defaultCities.store';
import { DefaultCitiesItem } from '../defaultCities/defaultCitiesItem';
import { DefaultCitiesList } from '../defaultCities/defaultCitiesList';

import './Home.scss';
import { SearchForm } from '../searchForm/SearchForm';
import { WeatherTypes } from '../../types/currentWeather.types';

@observer
export class Home extends React.Component {
  componentDidMount() {
    defaultCitiesStore.getData();
  }

  render() {
    let cityItem = null;
    if (defaultCitiesStore.currentWeather !== undefined) {
      cityItem = defaultCitiesStore.currentWeather.list.map((items: WeatherTypes, i) => {
        return (
          <DefaultCitiesItem
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
        <DefaultCitiesList>
          {cityItem}
        </DefaultCitiesList>
      </div>
    );
  }
}