import * as React from 'react';
import { apiConfigs } from '../../configs/apiConfigs';
import { DetailedWeatherTypes } from '../../types/detailedWeather.types';

interface DetailedWeatherItemProps {
  weatherData: DetailedWeatherTypes;
}

export const DetailedWeatherItem: React.SFC<DetailedWeatherItemProps> = (props: DetailedWeatherItemProps) => {
  return (
    <div className="detailed-weather__list-item">

      <div className="time">
        {Intl.DateTimeFormat('ru', { day: '2-digit',
            month: 'long', hour: 'numeric', minute: 'numeric'}).format(props.weatherData.dt * 1000)}
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
  );
};
