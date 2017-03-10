import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import 'font-awesome/css/font-awesome.min.css'
import App from './App'
import RealtimePage from './Realtime'
import './index.css'


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="realtime" component={RealtimePage} />
  </Router>
), document.getElementById('root'))