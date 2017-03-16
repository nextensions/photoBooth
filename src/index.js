import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import 'font-awesome/css/font-awesome.min.css'
import App from './App'
import ClockIn from './scences/ClockIn/'
import './index.css'


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="clock" component={ClockIn} />
  </Router>
), document.getElementById('root'))