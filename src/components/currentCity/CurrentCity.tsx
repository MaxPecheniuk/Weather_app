import * as React from 'react';
import './CurrentCity.scss';
import { currentCityStore } from './CurrentCity.store';
import { observer } from 'mobx-react';

@observer
export class CurrentCity extends React.Component {
  componentDidMount() {
    currentCityStore.getData();
  }

  render() {
    if (currentCityStore.geoLocation !== undefined) {
      console.log(currentCityStore.geoLocation);
    }
    return (
      <div>
        test
      </div>
    );
  }
}