import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UploadImage from './components/UploadImage';
import PostDetail from './components/PostDetail';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/upload" component={UploadImage} />
      <Route path="/post/:id" component={PostDetail} />
    </Switch>
  </Router>, document.getElementById('root'));
registerServiceWorker();
