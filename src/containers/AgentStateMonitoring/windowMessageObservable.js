import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { updateRealtimeStatisticsBatchData } from '../../redux/modules/reporting/agentStateMonitoring';
import store from '../../redux/store.js';

export function messageObservable() {
  return fromEvent(window, 'message')
    .filter(
      ({ data }) =>
        data.subscription &&
        data.subscription.topic === 'cxengage/reporting/batch-response' &&
        data.subscription.response &&
        data.subscription.response.resourceCapacity &&
        data.subscription.response.resourceStateList
    )
    .map(event =>
      store.dispatch(
        updateRealtimeStatisticsBatchData({
          resources: event.data.subscription.response.resourceCapacity.body.results.resourceCapacity,
          agentStates: event.data.subscription.response.resourceStateList.body.results.json
        })
      )
    );
}

let subscription;
export function messageSubscribe() {
  subscription = messageObservable().subscribe();
}
export function messageUnsubscribe() {
  subscription.unsubscribe();
}
