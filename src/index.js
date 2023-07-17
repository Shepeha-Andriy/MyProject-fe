import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import './index.scss';
import './utils/i18next'

const k = 'Ac-p8eB6PVV63DAQM68kf3xpzmwslkh6TrX7eeqsgZG-v23gRIR05P65YrYrXndsCPpvCHZJXjD-e1m6'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
        <BrowserRouter>
          <PayPalScriptProvider options={{ 'client-id': k, intent: 'capture' }}>
            <App></App>
          </PayPalScriptProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  // </Suspense>
);
