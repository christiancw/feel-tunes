import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import store from './store';
import { Main, Login, Signup, UserHome } from './components';
import MoodSelectorContainer from './components/MoodSelectorContainer';
// import {Main} from './components';
// import MoodSelector from './components';
import { me } from './reducer/user';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {darkBlack} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#6A8EAE",
    primary2Color: "9BD1E5",
    primary3Color: "#BEBBBB",
    textColor: darkBlack,
    borderColor: "#BEBBBB"
  }
});

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
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <Route path="login" component={Login} />
          <Route path="signup" component={Signup} />
          <Route path="app" component={MoodSelectorContainer} />
          <Route onEnter={requireLogin}>
            <Route path="home" component={UserHome} />
          </Route>
        </Route>
      </Router>
    </Provider>
   </MuiThemeProvider>,
  document.getElementById('app')

);

//
//

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Route path="/" component={MoodSelectorContainer} />
//     </Router>
//   </Provider>,
//   document.getElementById('app')
