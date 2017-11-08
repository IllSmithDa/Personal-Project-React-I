import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import VideoPlayer from './components/VideoPlayer';
import reducers from './reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider store = {createStore(reducers)}>
    <Router>
        <div>
            <Route exact path = "/" component = {App}/> 
            <Route exact path = "/player" component = {VideoPlayer}/>
        </div>
    </Router>
</Provider>, 
document.getElementById('root'));
registerServiceWorker();
