import * as React from 'react';
import { apiConfigs } from '../../configs/apiConfigs';
import { GeoCoordsWeatherTypes } from '../../types/Geocoord.types';

interface ICurrentCityProps {
  weatherData: GeoCoordsWeatherTypes;
}

export const CurrentCityItemMain: React.SFC<ICurrentCityProps> = (props: ICurrentCityProps) => {
  return (
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
          {Math.round(props.weatherData.main.temp)} °C
        </div>
      </div>
    </div>
  );

};