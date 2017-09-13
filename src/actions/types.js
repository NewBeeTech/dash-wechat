/*
 * huliyou
 * @flow
 */

export type Action =
{ type: 'GET_ACCOUNT' }
| { type: 'CREATE_ACCOUNT' }
| { type: 'UPDATE_ACCOUNT' }
| { type: 'EXIT_ACCOUNT' }
;

// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;

export type GetState = () => Object;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type PromiseAction = Promise<Action>;
