import { fromJS } from 'immutable';
import { from } from 'rxjs/observable/from';
import { fromEvent } from 'rxjs/observable/fromEvent';
import {
  messageObservable,
  messageSubscribe,
  messageUnsubscribe
} from '../windowMessageObservable';
import store from '../../../redux/store.js';
import { filterArray } from '../windowMessageObservable.js';

function createWindowMessageSubscriptionEvent(topic, response) {
  return [
    {
      data: {
        subscription: {
          topic: topic,
          response: response
        }
      }
    }
  ];
}
const mockState = fromJS({ SupervisorToolbar: {} });
jest.mock('rxjs/observable/fromEvent');
jest.mock('../../../redux/store.js');
store.getState.mockImplementation(() => mockState);

describe('Observable Test Filters', () => {
  function filterTest(topic) {
    it(`Filter allows ${topic} to pass through`, done => {
      const messageEvent = from(createWindowMessageSubscriptionEvent(topic));
      fromEvent.mockImplementationOnce(() => messageEvent);
      messageObservable().subscribe(() => {
        done();
      });
    });
  }
  filterArray.forEach(topic => topic !== 'monitorCall' && filterTest(topic));
});

describe('Observable Test Mapping topics to dispatched actions', () => {
  function dispatchFromMapTest(topic) {
    it(`Observable map dispatchs ${topic} to redux`, done => {
      const messageEvent = from(createWindowMessageSubscriptionEvent(topic));
      fromEvent.mockImplementationOnce(() => messageEvent);
      store.dispatch.mockClear();
      messageSubscribe();
      messageUnsubscribe();
      expect(store.dispatch).toBeCalledWith(
        expect.objectContaining({
          type: expect.any(String)
        })
      );
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toMatchSnapshot();
      done();
    });
  }

  filterArray.forEach(
    topic => topic !== 'monitorCall' && dispatchFromMapTest(topic)
  );

  it('can call monitorCall action through observable', done => {
    const monitorCallMessageEvent = from([
      {
        data: {
          subscription: {
            topic: 'monitorCall',
            response: { interactionId: 'mockId', status: 'mockStatus' }
          }
        }
      }
    ]);
    fromEvent.mockImplementationOnce(() => monitorCallMessageEvent);
    store.dispatch.mockClear();
    messageSubscribe();
    messageUnsubscribe();
    expect(store.dispatch).toBeCalledWith(
      expect.objectContaining({
        type: expect.any(String),
        interactionId: expect.any(String)
      })
    );
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toMatchSnapshot();
    done();
  });
});
