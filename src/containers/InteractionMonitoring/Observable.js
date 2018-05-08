import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { updateTableData } from '../../redux/modules/reporting/interactionMonitoring';

import store from '../../redux/store.js';

export function messageObservable() {
  return fromEvent(window, 'message')
    .filter(
      ({ data }) =>
        data.subscription &&
        data.subscription.topic === 'cxengage/reporting/batch-response'
    )
    .map(event =>
      store.dispatch(
        updateTableData(
          event.data.subscription.response.interactionsInConversationList.body
            .results.interactions
        )
      )
    );
}

let subscription;
export function subscribe() {
  subscription = messageObservable().subscribe();
}
export function unsubscribe() {
  subscription.unsubscribe();
}
