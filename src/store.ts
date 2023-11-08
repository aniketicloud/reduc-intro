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
  | { type: ActionType.AccountPayLoan };

const reducer = (state = initialState, action: Action) => {
  const { type } = action;
  const { balance, loan } = state;
  switch (type) {
    case ActionType.AccountDeposit: {
      const { payload } = action;
      return { ...state, balance: balance + payload };
    }
    case ActionType.AccountWithdraw: {
      const { payload } = action;
      return { ...state, balance: balance - payload };
    }
    case ActionType.AccountRequestLoan: {
      if (loan > 0) return state;
      const { payload } = action;
      const { amount, purpose } = payload;
      return {
        ...state,
        loan: amount,
        loanPurpose: purpose,
        balance: balance + amount,
      };
    }
    case ActionType.AccountPayLoan: {
      return { ...state, loan: 0, loanPurpose: "", balance: balance - loan };
    }

    default:
      return state;
  }
};

const deposit = (
  amount: number
): { type: ActionType.AccountDeposit; payload: number } => ({
  type: ActionType.AccountDeposit,
  payload: amount,
});
const withdraw = (
  amount: number
): { type: ActionType.AccountWithdraw; payload: number } => ({
  type: ActionType.AccountWithdraw,
  payload: amount,
});
const requestLoan = (
  amount: number,
  purpose: string
): {
  type: ActionType.AccountRequestLoan;
  payload: { amount: number; purpose: string };
} => ({
  type: ActionType.AccountRequestLoan,
  payload: {
    amount,
    purpose,
  },
});
const payLoan = (): { type: ActionType.AccountPayLoan } => ({
  type: ActionType.AccountPayLoan,
});
const amount = 300;
const store = createStore(reducer);
store.dispatch({
  type: ActionType.AccountDeposit,
  payload: amount,
});

store.dispatch(deposit(200));
console.log(store.getState());
store.dispatch(withdraw(50));
console.log(store.getState());
store.dispatch(requestLoan(500, "Pikachoo"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());
