import * as React from 'react';
import { match } from 'react-router';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { detailedWeatherStore } from './DetailedWeather.store';
import { DetailedWeatherTypes } from '../../types/detailedWeather.types';
import { DetailedWeatherItem } from './DetailedWeatherItem';
import { DetailedWeatherList } from './DetailedWeatherList';

import './DetailedWeather.scss';

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
    let cityName = '';
    if (detailedWeatherStore.cityWeather && detailedWeatherStore.cityName !== undefined) {
      cityName = detailedWeatherStore.cityName.name;
      detailedWeatherListItem = detailedWeatherStore.cityWeather.map((items: DetailedWeatherTypes, i) => {
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
        <Link to={'/'}><button className="btn">Back to home page</button></Link>
      </div>
    );
  }
}