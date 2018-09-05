import * as React from 'react';
import { observer } from 'mobx-react';
import { favoriteCitiesStore } from '../favoriteCities/FavoriteCities.store';
import { FavoriteCitiesItemMain } from '../favoriteCities/FavoriteCitiesItemMain';
import { FavoriteCitiesList } from '../favoriteCities/FavoriteCitiesList';

import './Home.scss';
import { SearchForm } from '../searchForm/SearchForm';
import { Settings } from '../settings/Settings';
import { FavoriteWeatherTypes } from '../../types/currentWeather.types';
import { CurrentCity } from '../currentCity/CurrentCity';

@observer
export class Home extends React.Component {
  render() {
    let cityItemMain = null;

    if (favoriteCitiesStore.currentWeather !== undefined) {
      cityItemMain = favoriteCitiesStore.currentWeather.list.map((items: FavoriteWeatherTypes, i) => {
        return (
          <FavoriteCitiesItemMain
            key={i}
            keys={i}
            weatherData={items}
          />
        );
      });
    }
    return (
      <div className="home">
        <Settings/>
        <h1>Weather and forecasts</h1>
        <SearchForm/>
        <h3>Weather in our city:</h3>
        <CurrentCity/>
        <h3>You'r favorite list:</h3>
        <FavoriteCitiesList>
          {cityItemMain}
        </FavoriteCitiesList>

      </div>
    );
  }
}