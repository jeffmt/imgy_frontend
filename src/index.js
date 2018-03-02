import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UploadImage from './components/UploadImage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/upload" component={UploadImage} />
    </Switch>
  </Router>, document.getElementById('root'));
registerServiceWorker();
