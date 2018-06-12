import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import * as classnames from 'classnames';
import { apiConfigs } from '../../configs/apiConfigs';
import { WeatherByDateTypes } from '../../types/weatherByDate.types';

interface DetailedWeatherItemProps {
  weatherData: WeatherByDateTypes;
}

@observer
export class DetailedWeatherItem extends React.Component<DetailedWeatherItemProps> {
  @observable
  private showDetailFlag = false;

  render() {
    let className = classnames('list-item__weather-forecast');
    if (this.showDetailFlag) {
      className += ' hide';
    }

    return (
      <div className="detailed-weather__list-item">
        <div className="list-item__date">
          {this.props.weatherData.date}
        </div>
        {/*<div onClick={() => this.showDetailFlag = !this.showDetailFlag}>*/}
          {/*See More*/}
        {/*</div>*/}
        <div className={className}>
        {this.props.weatherData.weatherData.map((item, i) => {
          return (
            <div key={i} className="list-item__weather-forecast__weather-data">
              <div className="list-item__weather-forecast__time">
                {new Date(item.dt * 1000).toLocaleTimeString(
                  'ru', {hour: 'numeric', minute: 'numeric'})}
              </div>
              <div className="list-item__weather-forecast__weather-condition">
                <div className="list-item__weather-forecast__weather-condition__description">
                  {item.weather[0].description}
                </div>
                <img src={apiConfigs.conditionIconUrl + item.weather[0].icon + '.png'} alt=""/>
              </div>
              <div className="list-item__weather-forecast__current-temp">
                {Math.round(item.main.temp)}°C
              </div>
            </div>
          );
        })}
        </div>

      </div>
    );
  }
}