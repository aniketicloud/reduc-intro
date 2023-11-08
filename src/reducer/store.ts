import { createStore } from "redux";
import { accountReducer, deposit, payLoan, requestLoan, withdraw } from "./AccountReducer";

const store = createStore(accountReducer);

store.dispatch(deposit(200));
console.log(store.getState());
store.dispatch(withdraw(50));
console.log(store.getState());
store.dispatch(requestLoan(500, "Pikachoo"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());
