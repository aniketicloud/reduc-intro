interface InitialStateCustomer {
  fullName: string;
  nationalId: string;
  createdAt: string;
}

const initialStateCustomer: InitialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const separator = "/";
enum CustomerActions {
  base = "customer",
  createCustomer = "createCustomer",
  updateCustomer = "updateCustomer",
}
enum ActionType {
  CreateCustomer = CustomerActions.base +
    separator +
    CustomerActions.createCustomer,
  UpdateCustomer = CustomerActions.base +
    separator +
    CustomerActions.createCustomer,
}

type CreateCustomer = {
  type: ActionType.CreateCustomer;
  payload: InitialStateCustomer;
};
type UpdateCustomer = {
  type: ActionType.UpdateCustomer;
  payload: string;
};
// ? Using discriminated unions
type Action = CreateCustomer;

const customerReducer = (state = initialStateCustomer, action: Action) => {
  const { type } = action;
  switch (type) {
    case ActionType.CreateCustomer:
      break;

    default:
      break;
  }
  return state;
};

console.log(customerReducer);

const createCustomer = (
  fullName: string,
  nationalId: string
): CreateCustomer => {
  return {
    type: ActionType.CreateCustomer,
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
};

const updateCustomer = (fullName: string): UpdateCustomer => {
  return {
    type: ActionType.UpdateCustomer,
    payload: fullName,
  };
};

console.log(createCustomer("James Bond", "007"));
console.log(updateCustomer("Bond James"));
