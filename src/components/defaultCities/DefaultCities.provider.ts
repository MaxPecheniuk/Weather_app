import { BaseProvider } from '../../providers/base.provider';
import { apiConfigs } from '../../configs/apiConfigs';
import { WeatherListTypes } from '../../types/currentWeather.types';

export class DefaultCitiesProvider extends BaseProvider {
  fetchCurrentWeather(id: string): Promise<WeatherListTypes> {
    console.log(id);
    return this.get<WeatherListTypes>(`group?id=${id}&appid=${apiConfigs.token}&units=metric`);
  }
}

export const defaultCitiesProvider = new DefaultCitiesProvider();
