import { BaseProvider } from '../../providers/base.provider';
import { apiConfigs } from '../../configs/apiConfigs';
import { FavoriteWeatherListTypes } from '../../types/currentWeather.types';

export class FavoriteCitiesProvider extends BaseProvider {
  fetchCurrentWeather(id: string): Promise<FavoriteWeatherListTypes> {
    return this.get<FavoriteWeatherListTypes>(`group?id=${id}&appid=${apiConfigs.token}&units=metric`);
  }
}

export const favoriteCitiesProvider = new FavoriteCitiesProvider();
