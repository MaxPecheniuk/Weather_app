import * as React from 'react';
import { Link } from 'react-router-dom';
import { apiConfigs } from '../../configs/apiConfigs';
import { WeatherTypes } from '../../types/currentWeather.types';

import './FavoriteCitiesItem.scss';
import { FavoriteCitiesItemDetails } from './FavoriteCitiesItemDetails';

interface CityItemProps {
  weatherData: WeatherTypes;
}

export const FavoriteCitiesItemMain: React.SFC<CityItemProps> = (props: CityItemProps) => {
  return (
    <div className="city-list-item">
      <Link to={'/city/' + props.weatherData.id}>
        <div className="city-list-item__main">
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
      <FavoriteCitiesItemDetails weatherData={props.weatherData}/>
    </div>
  );
};