import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BankAccount from './BankAccount.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BankAccount />
  </StrictMode>,
)
