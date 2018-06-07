import * as React from 'react';
import { Link } from 'react-router-dom';
import { apiConfigs } from '../../configs/apiConfigs';
import { WeatherTypes } from '../../types/currentWeather.types';

import './CurrentWeatherCityItem.scss';

interface CityItemProps {
  weatherData: WeatherTypes;
}

export const CurrentWeatherCityItem: React.SFC<CityItemProps> = (props: CityItemProps) => {
  return (
    <div className="city-list-item">
      <Link to={'/city/' + props.weatherData.id}>

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
                <img src={apiConfigs.conditionIconUrl + item.icon + '.png'} alt=""/>
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
          <img className="weather-icon" src={require('../../assets/humidity.svg')} alt=""/>
          <div className="city-list-item__details-item__text-block">
            <div className="text-block__name">Humidity</div>
            <div className="text-block__value">{props.weatherData.main.humidity}%</div>
          </div>
        </div>
        <div className="city-list-item__details-item">
          <img className="weather-icon" src={require('../../assets/pressure.svg')} alt=""/>
          <div className="city-list-item__details-item__text-block">
            <div className="text-block__name">Pressure</div>
            <div className="text-block__value">{props.weatherData.main.pressure}hPa</div>
          </div>
        </div>
        <div className="city-list-item__details-item">
          <img className="weather-icon" src={require('../../assets/wind.svg')} alt=""/>
          <div className="city-list-item__details-item__text-block">
            <div className="text-block__name">Wind</div>
            <div className="text-block__value">
              {props.weatherData.wind.speed}km/h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};