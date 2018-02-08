import { createStore } from 'redux';
import { fromJS } from 'immutable';
import reducer from './reducers';

export default function configureStore(initialState = {}) {
  return createStore(reducer, fromJS(initialState));
}
