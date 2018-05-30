import { from } from 'rxjs/observable/from';
import { fromEvent } from 'rxjs/observable/fromEvent';
import {
  messageObservable,
  messageSubscribe,
  messageUnsubscribe
} from '../windowMessageObservable';
import store from '../../../redux/store.js';

function createWindowMessageSubscriptionEvent(topic, response) {
  return [
    {
      data: {
        subscription: {
          topic: topic,
          response: {
            interactionsInConversationList: {
              body: {
                results: {
                  interactions: [{ item1: 'item1' }]
                }
              }
            }
          }
        },
        response: response
      }
    }
  ];
}

jest.mock('rxjs/observable/fromEvent');
jest.mock('../../../redux/store.js');

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
  filterTest('cxengage/reporting/batch-response');
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
  dispatchFromMapTest('cxengage/reporting/batch-response');
});
