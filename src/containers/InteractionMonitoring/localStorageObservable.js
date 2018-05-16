import { fromJS } from 'immutable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import { updateAllOfSupervisorToolbar } from '../../redux/modules/supervisorToolbar';
import store from '../../redux/store.js';

export function localStorageObservable() {
  return fromEvent(window, 'storage').map(response =>
    store.dispatch(
      updateAllOfSupervisorToolbar(
        fromJS(JSON.parse(localStorage.getItem('SupervisorToolbar')))
      )
    )
  );
}

let subscription;
export function localStorageSubscribe() {
  subscription = localStorageObservable().subscribe();
}
export function localStorageUnsubscribe() {
  subscription.unsubscribe();
}
