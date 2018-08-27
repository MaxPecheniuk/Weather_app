import * as React from 'react';
import { ReactNode } from 'react';

interface IDetailedWeatherListProps {
  children: ReactNode;
}

export const DetailedWeatherList: React.SFC<IDetailedWeatherListProps> = (props: IDetailedWeatherListProps) => {
  const children = React.Children.map(props.children, (child) => child);
  return (
    <div className="detailed-weather__list">
      {children}
    </div>
  );
};