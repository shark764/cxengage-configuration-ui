import { from } from 'rxjs/observable/from';
import { fromEvent } from 'rxjs/observable/fromEvent';
import {
  localStorageSubscribe,
  localStorageUnsubscribe
} from '../localStorageObservable';
import store from '../../../redux/store.js';

jest.mock('rxjs/observable/fromEvent');
jest.mock('../../../redux/store.js');

describe('Observable Test chaneges in localStorage to dispatched actions', () => {
  it(`updates the state when localstorage is changed`, done => {
    const messageEvent = from([{ status: 'local storage updated' }]);
    fromEvent.mockImplementationOnce(() => messageEvent);
    store.dispatch.mockClear();
    localStorageSubscribe();
    localStorageUnsubscribe();
    expect(store.dispatch).toBeCalledWith(
      expect.objectContaining({
        type: expect.any(String)
      })
    );
    expect(store.dispatch).toMatchSnapshot();
    done();
  });
});
