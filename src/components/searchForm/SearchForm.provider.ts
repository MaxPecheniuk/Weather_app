import { apiConfigs } from '../../configs/apiConfigs';
import { BaseProvider } from '../../providers/base.provider';
import { WeatherTypes } from '../../types/currentWeather.types';

export class SearchFormProvider extends BaseProvider {
  fetchCityWeather(id: string): Promise<WeatherTypes> {
    return this.get<WeatherTypes>(`weather?q=${id}&appid=${apiConfigs.token}&units=metric`);
  }
}

export const searchFormProvider = new SearchFormProvider();