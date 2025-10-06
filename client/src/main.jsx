import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './context/AuthContext.jsx';

const stripePromise = loadStripe('pk_test_51SDqCOAs2WaSiOmCMOzjxd4Awvd2AaVm3Y9EZw0xFwp5X6NSIGSbdUfRqmbgHBhh1mcZRt6LTq2RcnI2grSuzO7B00fCmu9D2b');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <App />
          <Toaster />
        </Elements>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
