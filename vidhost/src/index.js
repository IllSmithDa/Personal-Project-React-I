import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import VideoPlayer from './components/VideoPlayer';
import NewAccount from './components/NewAccount';
import LoginMenu from './components/Login';
import Channel from './components/Channel'
import reducers from './reducers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<Provider store = {createStore(reducers)}>
    <Router>
        <div>
            <Route exact path = "/" component = {App}/> 
            <Route exact path = "/player" component = {VideoPlayer}/>
            <Route path = '/new-user' component = {NewAccount}/>
            <Route path = '/login' component = {LoginMenu}/>    
            <Route path = '/my_channel/:id' component = {Channel}/> 
        </div>
    </Router>
</Provider>, 
document.getElementById('root'));
registerServiceWorker();
