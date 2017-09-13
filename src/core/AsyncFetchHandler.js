/**
 * Happy Hacking
 */

import * as FetchState from './FetchState';

const AsyncFetchHandler = (
  actionName: string,
  fetchResultPromise: Promise,
  dispatch: Function
) => {
  dispatch({
    type: FetchState.REQUEST(actionName),
  });
  fetchResultPromise
    .then(data => {
      if (data.code === 0 || data.code === undefined) {
        dispatch({
          type: FetchState.SUCCESS(actionName),
          data: data.data ? data.data : data,
        });
      } else {
        dispatch({
          type: FetchState.FAILURE(actionName),
          errMsg: data.message,
        });
      }
    })
    .catch(err => {
      console.warn(err);
      dispatch({
        type: FetchState.FAILURE(actionName),
        errMsg: err.message,
      });
    });
};

export default AsyncFetchHandler;
