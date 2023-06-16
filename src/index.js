import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import './index.scss';
import './utils/i18next'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </Suspense>
);
