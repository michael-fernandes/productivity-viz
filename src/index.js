import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux"
import configureStore from "./Store/configureStore";
// import Login from "./Components/Login/Login"

let store = configureStore();
window.s = store; // for debugging

ReactDOM.render(
    <Provider store={store}> 
        <App /> 
    </Provider>, document.getElementById('root') );
registerServiceWorker();