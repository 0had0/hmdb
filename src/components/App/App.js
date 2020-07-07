import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {SeachView, OverView, DiscoveryView} from '../../Views';

import Navigation from '../Navigation';

function App() {
  return (
   <Switch>
        <Navigation />
        <Route path='/seach/:query' component={SeachView} />
        <Route path='/movie/:id' component={OverviewView} />
        <Route exact path='/' component={DicoveryView}/>
   </Switch>
  );
}

export default App;
