import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

import { requestingMonitorCall } from '../../redux/modules/supervisorToolbar';

import store from '../../redux/store.js';

export const filterArray = [
  'cxengage/session/sqs-shut-down',
  'cxengage/twilio/device-ready',
  'cxengage/interactions/voice/silent-monitor-start',
  'cxengage/interactions/voice/silent-monitor-end',
  'cxengage/interactions/voice/unmute-acknowledged',
  'cxengage/interactions/voice/mute-acknowledged',
  'cxengage/session/started',
  'monitorCall'
];

export function messageObservable() {
  return fromEvent(window, 'message')
    .filter(({ data }) => data.subscription && filterArray.includes(data.subscription.topic))
    .map(event => {
      let subscription = event.data.subscription;
      if (subscription.topic === 'monitorCall') {
        store.dispatch(
          requestingMonitorCall(
            subscription.response.interactionId,
            subscription.response.transitionCall,
            subscription.response.chosenExtension
          )
        );
      } else {
        store.dispatch({
          type: subscription.topic,
          response: subscription.response
        });
      }
      return event;
    })
    .do(({ data }) => {
      data.subscription.topic !== 'monitorCall' &&
        localStorage.setItem(
          'SupervisorToolbar',
          JSON.stringify(
            store
              .getState()
              .get('SupervisorToolbar')
              .toJS()
          )
        );
    })
    .map(event => ({ type: `${event.data.subscription.topic}_$` }));
}

let subscription;
export function messageSubscribe() {
  subscription = messageObservable().subscribe();
}
export function messageUnsubscribe() {
  subscription.unsubscribe();
}
