import { BaseProvider } from '../../providers/base.provider';
import { apiConfigs } from '../../configs/apiConfigs';
import { GeoCoordsWeatherTypes } from '../../types/Geocoord.types';

export class CurrentCityProvider extends BaseProvider {
  fetchWeather(lat: number, lon: number): Promise<GeoCoordsWeatherTypes> {
    return this.get<GeoCoordsWeatherTypes>(`weather?lat=${lat}&lon=${lon}&appid=${apiConfigs.token}&units=metric`);
  }
}

export const currentCityProvider = new CurrentCityProvider();