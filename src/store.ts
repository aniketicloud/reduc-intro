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
  | { type: ActionType.AccountRequestLoan; payload: number }
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
      // TODO: check and add dispatch for loan purpose
      if (loan > 0) return state;
      return { ...state, loan: payload };
    }
    case ActionType.AccountPayLoan: {
      // TODO: check and add dispatch for loan purpose
      if (loan > 0) return state;
      return { ...state, loan: 0, loanPurpose: "", balance: balance - loan };
    }

    default:
      return state;
  }
};

const store = createStore(reducer);
store.dispatch({ type: ActionType.AccountDeposit, payload: 12 });
console.log(store.getState());
