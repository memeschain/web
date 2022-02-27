import React from 'react';
import ReactDOM from 'react-dom';
import Parse from 'parse';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';
(async () => {
  // await initWeb3();
  Parse.initialize(
    'own_that_meme',
  );
  Parse.serverURL = process.env.REACT_APP_SERVER + process.env.REACT_APP_SERVER_PARSE;
  
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
})();
