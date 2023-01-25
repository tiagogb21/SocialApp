export const messages = {
  required: (field: string) => `${field} is required`,
  invalid: (field: string) => `${field} is invalid`,
};

export const message = {
  notFound: (target: string) => `${target} not found`,
  notUpdated: (target: string) => `${target} not updated`,
  alreadyExists: (target: string) => `${target} already exists`,
  notActive: (target: string) => `${target} is not active`,
};
