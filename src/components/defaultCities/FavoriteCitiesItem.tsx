import * as React from 'react';
import { Link } from 'react-router-dom';
import { apiConfigs } from '../../configs/apiConfigs';
import { WeatherTypes } from '../../types/currentWeather.types';

import './FavoriteCitiesItem.scss';

interface CityItemProps {
  weatherData: WeatherTypes;
}

export const FavoriteCitiesItem: React.SFC<CityItemProps> = (props: CityItemProps) => {
  return (
    <div className="city-list-item">
      <Link to={'/city/' + props.weatherData.id}>

        {/*//TODO: Я бы вынес в отдельные компоненты main и details тогда компонент станет более читаемым*/}
      <div className="city-list-item__main">
        <div className="city-list-item__main__city-name">
          {props.weatherData.name}
        </div>
        <div className="city-list-item__main__weather-data">
          {props.weatherData.weather.map((item, i) => {
            return (
              <div key={i} className="city-list-item__main__weather-condition">
                <div className="city-list-item__main__weather-condition__description">
                  {item.description}
                </div>
                <img className="weather-condition_icon" src={apiConfigs.conditionIconUrl + item.icon + '.png'} alt=""/>
              </div>
            );
          })}
          <div className="city-list-item__main__current-temp">
            {Math.round(props.weatherData.main.temp)}°C
          </div>
        </div>
      </div>
      </Link>
      <div className="city-list-item__details">
        <div className="city-list-item__details-item">
          <img className="weather-icon" src={require('../../assets/humidity_white.svg')} alt=""/>
          <div className="city-list-item__details-item__text-block">
            <div className="text-block__name">Humidity</div>
            <div className="text-block__value">{Math.round(props.weatherData.main.humidity)}%</div>
          </div>
        </div>
        <div className="city-list-item__details-item">
          <img className="weather-icon" src={require('../../assets/pressure_white.svg')} alt=""/>
          <div className="city-list-item__details-item__text-block">
            <div className="text-block__name">Pressure</div>
            <div className="text-block__value">{Math.round(props.weatherData.main.pressure)} hPa</div>
          </div>
        </div>
        <div className="city-list-item__details-item">
          <img className="weather-icon" src={require('../../assets/wind-white.svg')} alt=""/>
          <div className="city-list-item__details-item__text-block">
            <div className="text-block__name">Wind</div>
            <div className="text-block__value">
              {Math.round(props.weatherData.wind.speed)} m/s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};