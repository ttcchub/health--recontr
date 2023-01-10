import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, useFetcher } from 'react-router-dom'
import store from './redux/reducer/store'
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <div className='capitalize'>

      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  </Provider>
);
