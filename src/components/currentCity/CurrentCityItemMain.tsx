import * as React from 'react';
import { GeocoordTypes } from '../../types/Geocoord.types';
import { apiConfigs } from '../../configs/apiConfigs';

interface CurrentCityProps {
  weatherData: GeocoordTypes;
}
export const CurrentCityItemMain: React.SFC<CurrentCityProps> = (props: CurrentCityProps) => {
      return (
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
              {Math.round(props.weatherData.main.temp)}
            </div>
          </div>
        </div>
    );

};