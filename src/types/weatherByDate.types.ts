import { DetailedWeatherItemTypes } from './detailedWeather.types';

export interface WeatherByDateTypes {
  date: string;
  weatherData: Array<DetailedWeatherItemTypes>;

}