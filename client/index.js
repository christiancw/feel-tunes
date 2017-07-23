import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome, Navbar } from './components';
import MoodSelectorContainer from './components/MoodSelectorContainer';
import { me } from './reducer/user';

const whoAmI = store.dispatch(me());

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) replace('/login');
      next();
    })
    .catch(err => console.log(err));

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <Route path="login" component={Login} />
          <Route path="signup" component={Signup} />
          <Route path="app" component={MoodSelectorContainer} />
          <Route path="auth/spotify/callback/:accessToken" component={MoodSelectorContainer} />
          <Route onEnter={requireLogin}>
            <Route path="home" component={UserHome} />
          </Route>
        </Route>
      </Router>
    </Provider>,
  document.getElementById('app')

);
