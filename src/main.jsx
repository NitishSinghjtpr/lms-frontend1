import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './Redux/store';
import { Provider } from 'react-redux';   // FIXED

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>               {/* FIXED */}
      <App />
    </Provider>
  </React.StrictMode>
)
