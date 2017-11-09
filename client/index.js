import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome, Navbar } from './components';
import MoodSelectorContainer from './components/MoodSelectorContainer';
import UserPlaylists from './components/UserPlaylists';
import Welcome from './components/Welcome';
import { me } from './reducer/user';

const whoAmI = store.dispatch(me());

const requireLogin = (nextRouterState, replace, next) =>
  whoAmI
    .then(() => {
      const { user } = store.getState();
      if (!user.id) replace('/app');
      next();
    })
    .catch(err => (err));

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRedirect to="app" />
          <Route path="userplaylists" component={UserPlaylists} />
          <Route path="app" component={Main} />
          <Route path="auth/spotify/callback/:accessToken" component={MoodSelectorContainer} />
          <Route onEnter={requireLogin}>
            <Route path="home" component={Main} />
          </Route>
        </Route>
      </Router>
    </Provider>,
  document.getElementById('app')

);
