import * as React from 'react';

import './NotFound.scss';
import { Link } from 'react-router-dom';

export const NotFound: React.SFC<{}> = () => {
  return (
    <div className="page-not-found">
      <h1 className="page-not-found_txt">Oops! City not found!</h1>
      <Link to={'/'}>
        <button className="btn">Back to home page</button>
      </Link>
    </div>
  );
};