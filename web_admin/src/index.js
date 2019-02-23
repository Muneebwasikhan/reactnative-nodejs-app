/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import Store from "./Store/Store"

import $ from "jquery"
import Popper from "popper.js"
import "bootstrap/dist/js/bootstrap.min"
import "bootstrap/dist/js/bootstrap.bundle.min"



import animate from "animate.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.css"
import "material-design-iconic-font/dist/css/material-design-iconic-font.min.css"








window.$ = $;



ReactDOM.render(<Provider store={Store} ><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
