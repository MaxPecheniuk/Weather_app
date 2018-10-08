import * as React from 'react';
import { ReactNode } from 'react';

interface ICitiesListProps {
  children: ReactNode;
}

export const FavoriteCitiesList: React.SFC<ICitiesListProps> = (props: ICitiesListProps) => {
  const children = React.Children.map(props.children, (child) => child);

  return (
    <div className="city-list">
      {children}
    </div>
  );
};