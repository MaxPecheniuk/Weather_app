import * as React from 'react';
import './CurrentCity.scss';
import { currentCityStore } from './CurrentCity.store';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';

// import { CurrentCityItem } from './CurrentCityItem';

@observer
export class CurrentCity extends React.Component {

  componentWillMount() {
    console.log('up1');

    currentCityStore.getGeoData();
    console.log(currentCityStore.geoLocation);
    //
    // if (currentCityStore.currentCityWeather !== undefined) {
    //   currentCityStore.getWeatherData(currentCityStore.geoLocation.latitude, currentCityStore.geoLocation.longitude);
    //
    // }

    reaction(() => currentCityStore.currentCityWeather, (weather) => console.log(weather));

  }
  componentDidMount() {
    console.log(currentCityStore.geoLocation);

  }

  render() {
    let city = null;
    // if (currentCityStore.currentCityWeather === undefined) {
    //   return (<div> Loading</div>);
    // }
    // if (currentCityStore.geoLocation !== undefined) {
    //   console.log(currentCityStore.geoLocation);
    //
    // }
    // let cityItem = null;

    return (
      <div>
        {city}
        {/*{currentCityStore.currentCityWeather.name}*/}
      </div>
    );
  }
}