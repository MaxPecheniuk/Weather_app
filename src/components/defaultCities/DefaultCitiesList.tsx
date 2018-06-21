import * as React from 'react';
import { ReactNode } from 'react';

interface CitiesListProps {
  children: ReactNode;
}

export const DefaultCitiesList: React.SFC<CitiesListProps> = (props: CitiesListProps) => {
  const children = React.Children.map(props.children, (child) =>  child);

  return (
    <div className="city-list">
      {children}
    </div>
  );
};