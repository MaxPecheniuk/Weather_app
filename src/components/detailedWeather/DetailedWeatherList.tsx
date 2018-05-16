import * as React from 'react';
import { ReactNode } from 'react';

interface DetailedWeatherListProps {
  children: ReactNode;
}

export const DetailedWeatherList: React.SFC<DetailedWeatherListProps> = (props: DetailedWeatherListProps) => {
  const children = React.Children.map(props.children, (child) => child);
  return (
    <div className="detailed-weather__list">
      {children}
    </div>
  );
};