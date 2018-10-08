import * as React from 'react';
import { match } from 'react-router';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { detailedWeatherStore } from './DetailedWeather.store';
import { WeatherByDateTypes } from '../../types/weatherByDate.types';
import { DetailedWeatherItem } from './DetailedWeatherItem';
import { DetailedWeatherList } from './DetailedWeatherList';
import './DetailedWeather.scss';

interface IDetailedWeatherProps {
  match?: match<{ id: string }>;
}

@observer
export class DetailedWeather extends React.Component<IDetailedWeatherProps> {

  componentDidMount() {
    const id = this.props.match!.params.id;
    detailedWeatherStore.getData(id);
  }

  render() {
    let detailedWeatherListItem = null;
    let cityName: string = '';
    let weatherByDate: Array<WeatherByDateTypes> = [];

    if (detailedWeatherStore.cityWeather !== undefined) {
      cityName = detailedWeatherStore.cityWeather.city.name;
      detailedWeatherStore.cityWeather.list.map((item) => {
        const dateItem = new Date(item.dt * 1000).toLocaleDateString(
          'en-US', {day: 'numeric', month: 'long', weekday: 'long'});
        let hasItem = false;
        weatherByDate.map((value: WeatherByDateTypes) => {
          if (value.date === dateItem) {
            value.weatherData.push(item);
            hasItem = true;
          }
        });
        if (!hasItem) {
          weatherByDate.push(
            {
              date: dateItem,
              weatherData: [item]
            }
          );
        }
      });
      detailedWeatherListItem = weatherByDate.map((items: WeatherByDateTypes, i) => {
        return (
          <DetailedWeatherItem
            key={i}
            weatherData={items}
          />);
      });
    }

    return (
      <div className="detailed-weather">
        <div className="detailed-weather__city-name">
          Detailed weather forecast in {cityName}
        </div>
        <DetailedWeatherList>
          {detailedWeatherListItem}
        </DetailedWeatherList>
        <Link to={'/'}>
          <button className="btn">Back to home page</button>
        </Link>
      </div>
    );
  }
}