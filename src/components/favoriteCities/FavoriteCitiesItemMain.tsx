import * as React from 'react';
import { Link } from 'react-router-dom';
import { settingsStore } from '../settings/Settings.store';
import { apiConfigs } from '../../configs/apiConfigs';
import { FavoriteWeatherTypes } from '../../types/currentWeather.types';
import { FavoriteCitiesItemDetails } from './FavoriteCitiesItemDetails';
import './FavoriteCitiesItem.scss';

interface ICityItemProps {
  weatherData: FavoriteWeatherTypes;
  index: number;
}

export const FavoriteCitiesItemMain: React.SFC<ICityItemProps> = (props: ICityItemProps) => {
  return (
    <div className="city-list-item">
      <div className="city-list-item__main">
        <img
          className="city-list-item__main__delete-item"
          src={require('../../assets/cross.svg')}
          onClick={() => {
            settingsStore.deleteCity = props.index;
          }}
        />
        <Link to={'/city/' + props.weatherData.id}>
          <div className="city-list-item__main__info-wrapper">
            <div className="city-list-item__main__city-name">
              {props.weatherData.name}
            </div>
            <div className="city-list-item__main__weather-data">
              <div className="city-list-item__main__weather-condition">
                <div className="city-list-item__main__weather-condition__description">
                  {props.weatherData.weather[0].description}
                </div>
                <img
                  className="weather-condition_icon"
                  src={apiConfigs.conditionIconUrl + props.weatherData.weather[0].icon + '.png'}
                />
              </div>
              <div className="city-list-item__main__current-temp">
                {Math.round(props.weatherData.main.temp)}°C
              </div>
            </div>
          </div>
        </Link>
      </div>
      <FavoriteCitiesItemDetails weatherData={props.weatherData}/>
    </div>
  );
};