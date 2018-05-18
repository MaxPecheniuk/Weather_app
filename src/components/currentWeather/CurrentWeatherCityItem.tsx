import * as React from 'react';
import { apiConfigs } from '../../configs/apiConfigs';
import { CurrentWeatherTypes } from '../../types/currentWeather.types';

import './CurrentWeatherCityItem.scss';
interface CityItemProps {
  weatherData: CurrentWeatherTypes;
  // weatherIcon: string;
  // weatherDescription: string;
}

export const CurrentWeatherCityItem: React.SFC<CityItemProps> = (props: CityItemProps) => {
  return (
    <div className="city-list-item">

      <div className="city-list-item__main">

        <div className="city-list-item__main__city-name">
          {props.weatherData.name}
        </div>

        {props.weatherData.weather.map((item, i) => {
          return(
            <div key={i} className="city-list-item__main__weather-condition">
              <img  src={apiConfigs.conditionIconUrl + item.icon + '.png'} alt=""/>
              <div className="city-list-item__main__weather-condition__description">
                {item.description}
              </div>
            </div>
          );
        })}

        <div className="city-list-item__current-temp">
          {Math.round(props.weatherData.main.temp)}°C
        </div>
      </div>

        <div className="city-list-item_details">

          <div className="city-list-item__humidity">
            Humidity: {props.weatherData.main.humidity}%
          </div>

          <div className="city-list-item__wind">
            Wind: {props.weatherData.wind.speed} km/h
          </div>
        </div>

    </div>
  );
};