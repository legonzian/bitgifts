import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
