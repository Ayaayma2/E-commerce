import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fortawesome/fontawesome-free/css/all.min.css'
// import  '../node_modules/bootstrap/dist/css/bootstrap.min.css'
//  import  '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import'../node_modules/flowbite/dist/flowbite.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
