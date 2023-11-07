import { createStore } from "redux";

interface InitialState {
  balance: number;
  loan: number;
  loanPurpose: string;
}

const initialState: InitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const separator = "/";
enum AccountActions {
  base = "account",
  deposit = "deposit",
  withdraw = "withdraw",
  requestLoan = "requestLoan",
  payLoan = "payLoan",
}
enum ActionType {
  AccountDeposit = AccountActions.base + separator + AccountActions.deposit,
  AccountWithdraw = AccountActions.base + separator + AccountActions.withdraw,
  AccountRequestLoan = AccountActions.base +
    separator +
    AccountActions.requestLoan,
  AccountPayLoan = AccountActions.base + separator + AccountActions.payLoan,
}

type Action =
  | { type: ActionType.AccountDeposit; payload: number }
  | { type: ActionType.AccountWithdraw; payload: number }
  | {
      type: ActionType.AccountRequestLoan;
      payload: { amount: number; purpose: string };
    }
  | { type: ActionType.AccountPayLoan; payload: number };

const reducer = (state = initialState, action: Action) => {
  const { payload, type } = action;
  const { balance, loan } = state;
  switch (type) {
    case ActionType.AccountDeposit: {
      return { ...state, balance: balance + payload };
    }
    case ActionType.AccountWithdraw: {
      return { ...state, balance: balance - payload };
    }
    case ActionType.AccountRequestLoan: {
      if (loan > 0) return state;
      const { amount, purpose } = payload;
      return {
        ...state,
        loan: amount,
        loanPurpose: purpose,
        balance: balance + amount,
      };
    }
    case ActionType.AccountPayLoan: {
      if (loan > 0) return state;
      return { ...state, loan: 0, loanPurpose: "", balance: balance - loan };
    }

    default:
      return state;
  }
};

const store = createStore(reducer);
store.dispatch({ type: ActionType.AccountDeposit, payload: 300 });
store.dispatch({
  type: ActionType.AccountRequestLoan,
  payload: { amount: 1000, purpose: "To buy a cheapest mobile" },
});

// will not make a difference due to condition in reducer
store.dispatch({
  type: ActionType.AccountRequestLoan,
  payload: { amount: 2000, purpose: "To buy a big mobile" },
});
console.log(store.getState());
