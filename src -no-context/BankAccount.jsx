import { useReducer } from 'react'

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  //   hasLoan: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'activate':
      return { ...state, isActive: true, balance: 500 }
    case 'deposit':
      return { ...state, balance: state.balance + 150 }
    case 'withdraw':
      return { ...state, balance: state.balance - 50 }
    case 'requestLoan':
      return {
        ...state,
        balance: state.loan === 0 ? state.balance + 5000 : state.balance,
        loan: 5000,
      }
    case 'payLoan':
      return {
        ...state,
        balance: state.loan === 5000 ? state.balance - 5000 : state.balance,
        loan: 0,
      }
    case 'close':
      return {
        state: state.loan === 0 && state.balance === 0 ? initialState : state,
      }
    default:
      break
  }
}

const BankAccount = () => {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const canClose = isActive == true && balance == 0
  //   console.log(canClose)

  return (
    <div className='app'>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: 'activate' })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'deposit' })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'withdraw' })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'requestLoan' })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'payLoan' })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: 'close' })}
          disabled={!canClose}
        >
          Close account
        </button>
      </p>
    </div>
  )
}

export default BankAccount
