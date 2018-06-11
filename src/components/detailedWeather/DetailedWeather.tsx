import * as React from 'react';
import { match } from 'react-router';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { detailedWeatherStore } from './DetailedWeather.store';
// import { DetailedWeatherItemTypes } from '../../types/detailedWeather.types';
import { DetailedWeatherItem } from './DetailedWeatherItem';
import { DetailedWeatherList } from './DetailedWeatherList';

import './DetailedWeather.scss';
import { WeatherByDateTypes } from '../../types/weatherByDate.types';

// import { DetailedWeatherItemTypes } from '../../types/detailedWeather.types';

interface Props {
  match?: match<{ id: string }>;
}

@observer
export class DetailedWeather extends React.Component<Props> {
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
          'ru', {day: '2-digit', month: '2-digit'});
        let hasItem = false;
        weatherByDate.map((value: any) => {
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
      console.log(weatherByDate);
      detailedWeatherListItem = weatherByDate.map((items: WeatherByDateTypes, i) => {
        return (
          <DetailedWeatherItem
            key={i}
            // date={items.date}
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
        <Link to={'/home'}>
          <button className="btn">Back to home page</button>
        </Link>
      </div>
    );
  }
}