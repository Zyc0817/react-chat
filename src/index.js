import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authoroute/authoroute'
import Geniusinfo from './component/geniusinfo/geniusinfo'
import Chat  from './container/chat/chat'


const store = createStore(reducers, applyMiddleware(thunk))

function Boss() {
    return <h2>11</h2>
}

ReactDOM.render(
    (<Provider store={store}>
    	<BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path='/boss' component={Boss}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/geniusinfo' component={Geniusinfo}></Route>
                <Route path='/chat/:user' component={Chat}></Route>
            </div>
    	</BrowserRouter>
    </Provider>),
    document.getElementById('root')
);