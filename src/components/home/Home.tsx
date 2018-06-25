import * as React from 'react';
import { observer } from 'mobx-react';
import { favoriteCitiesStore } from '../defaultCities/FavoriteCities.store';
import { FavoriteCitiesItem } from '../defaultCities/FavoriteCitiesItem';
import { FavoriteCitiesList } from '../defaultCities/FavoriteCitiesList';

import './Home.scss';
import { SearchForm } from '../searchForm/SearchForm';
import { Settings } from '../settings/Settings';
import { WeatherTypes } from '../../types/currentWeather.types';

@observer
export class Home extends React.Component {
  componentDidMount() {
    // favoriteCitiesStore.getData();
  }

  render() {
    let cityItem = null;
    if (favoriteCitiesStore.currentWeather !== undefined) {
      cityItem = favoriteCitiesStore.currentWeather.list.map((items: WeatherTypes, i) => {
        return (
          <FavoriteCitiesItem
            key={i}
            weatherData={items}
          />);
      });
    }
    return (
      <div className="home">
          <Settings/>

        <h1>Weather and forecasts</h1>
        {/*<h3>Select a city to view the weather forecast</h3>*/}
        <SearchForm/>
        <h3>You'r favorite list:</h3>

        <FavoriteCitiesList>
          {cityItem}
        </FavoriteCitiesList>
      </div>
    );
  }
}