import * as React from 'react';
import { GeoCoordsWeatherTypes } from '../../types/Geocoord.types';

interface CurrentCityProps {
  weatherData: GeoCoordsWeatherTypes;
}
export const CurrentCityItemDetails: React.SFC<CurrentCityProps> = (props: CurrentCityProps ) => {
  return (
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
 );
};