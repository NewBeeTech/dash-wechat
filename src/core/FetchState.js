/**
 * Happy Hacking
 */

export const SUCCESS = (actionName: string) => {
  return `${actionName}_SUCCESS`;
};

export const FAILURE = (actionName: string) => {
  return `${actionName}_FAILURE`;
};

export const REQUEST = (actionName: string) => {
  return `${actionName}_REQUEST`;
};
