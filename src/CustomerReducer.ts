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
}
enum ActionType {
  CreateCustomer = CustomerActions.base +
    separator +
    CustomerActions.createCustomer,
}

type CreateCustomer = {
  type: ActionType.CreateCustomer;
  payload: InitialStateCustomer;
};
// ? Using discriminated unions
type Action = CreateCustomer;

const reducer = (state = initialStateCustomer, action: Action) => {
  const { type } = action;
  switch (type) {
    case ActionType.CreateCustomer:
      break;

    default:
      break;
  }
  return state;
};

console.log(reducer);

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

console.log(createCustomer("James Bond", "007"));
