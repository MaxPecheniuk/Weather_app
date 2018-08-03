import * as React from 'react';
import './CurrentCity.scss';
import { currentCityStore } from './CurrentCity.store';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import { apiConfigs } from '../../configs/apiConfigs';

@observer
export class CurrentCity extends React.Component {

  componentDidMount() {
    currentCityStore.getGeoData();
    reaction(() => currentCityStore.currentCityWeather, (weather) => console.log(weather));
  }

  render() {
    const {currentCityWeather} = currentCityStore;

    if (currentCityStore.currentCityWeather === undefined) {
      return (<div> Loading data ...</div>);
    }
    return (
      <div className="current-city_wrapper">
        <div className="city-list-item__main">
          <div className="city-list-item__main__city-name">
            {currentCityWeather.name}
          </div>
          <div className="city-list-item__main__weather-data">
            {currentCityWeather.weather.map((item, i) => {
              return (
                <div key={i} className="city-list-item__main__weather-condition">
                  <div className="city-list-item__main__weather-condition__description">
                    {item.description}
                  </div>
                  <img src={apiConfigs.conditionIconUrl + item.icon + '.png'} alt=""/>
                </div>
              );
            })}
            <div className="city-list-item__main__current-temp">
              {Math.round(currentCityWeather.main.temp)}
            </div>
          </div>
        </div>

      </div>
    );
  }
}