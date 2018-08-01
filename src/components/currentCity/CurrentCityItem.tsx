import * as React from 'react';
import { GeocoordTypes } from '../../types/Geocoord.types';

interface Props {
  data: GeocoordTypes;
}
export class CurrentCityItem extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.data.name}
        {this.props.data.dt}
      </div>
    );
  }
}