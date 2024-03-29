require('file-loader?name=[name].[ext]!./index.html');
require('file-loader?name=[name].[ext]!./customizer-control-script-loader.js');
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './App.scss';

const appElement = document.getElementById('wp-drag-sort-multi-image-upload-control');

ReactDOM.render(<App {...JSON.parse(appElement.innerHTML)} />, appElement);