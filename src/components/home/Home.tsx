import * as React from 'react';
import { observer } from 'mobx-react';
import { favoriteCitiesStore } from '../favoriteCities/FavoriteCities.store';
import { FavoriteWeatherTypes } from '../../types/currentWeather.types';
import { Settings } from '../settings/Settings';
import { SearchForm } from '../searchForm/SearchForm';
import { CurrentCity } from '../currentCity/CurrentCity';
import { FavoriteCitiesList } from '../favoriteCities/FavoriteCitiesList';
import { FavoriteCitiesItemMain } from '../favoriteCities/FavoriteCitiesItemMain';
import './Home.scss';
import { settingsStore } from '../settings/Settings.store';

@observer
export class Home extends React.Component {
  componentDidMount() {
    settingsStore.getSettingList();
  }

  render() {
    let favoriteCitiesItem = null;
    if (favoriteCitiesStore.currentWeather !== undefined) {
      favoriteCitiesItem = favoriteCitiesStore.currentWeather.list.map((items: FavoriteWeatherTypes, i) => {
        return (
          <FavoriteCitiesItemMain
            key={i}
            index={i}
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
        <h3>Weather in your city:</h3>
        <CurrentCity/>
        <h3>Favorite list:</h3>
        <FavoriteCitiesList>
          {favoriteCitiesItem}
        </FavoriteCitiesList>
      </div>
    );
  }
}