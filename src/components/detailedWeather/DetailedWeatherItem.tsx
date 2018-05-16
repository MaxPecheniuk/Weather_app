import * as React from 'react';
import { apiConfigs } from '../../configs/apiConfigs';
import { DetailedWeatherTypes } from '../../types/detailedWeather.types';

interface DetailedWeatherItemProps {
  weatherData: DetailedWeatherTypes;
  weatherIcon: string;
  weatherDescription: string;
}

export const DetailedWeatherItem: React.SFC<DetailedWeatherItemProps> = (props: DetailedWeatherItemProps) => {
  return (
    <div className="detailed-weather__list-item">
      <div className="time">
        {Intl.DateTimeFormat('ru', { day: '2-digit',
            month: 'long', hour: 'numeric', minute: 'numeric'}).format(props.weatherData.dt * 1000)}
      </div>
      <div className="city-list-item__weather-condition">
        <img src={apiConfigs.conditionIconUrl + props.weatherIcon + '.png'} alt=""/>
        {props.weatherDescription}
      </div>
      <div className="city-list-item__current-temp">
        {Math.round(props.weatherData.main.temp)} °C
      </div>
    </div>
  );
};
