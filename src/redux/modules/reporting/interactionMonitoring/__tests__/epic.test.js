/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { ActionsObservable } from 'redux-observable';
import { mockStore } from 'TestUtils';
import { sdkPromise } from '../../../../../utils/sdk';
import { StartBatchRequest, StartBatchSubscription } from '../epics';
import {
  startInteractionMonitoring,
  startReportingSubscriptions
} from '../index';

jest.mock('../../../../../utils/sdk');

beforeEach(() => {
  sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));
});
afterEach(() => {
  sdkPromise.mockClear();
});

describe('startBatchRequest', () => {
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(startInteractionMonitoring());
    StartBatchRequest(action, mockStore).subscribe(() => {
      expect(sdkPromise).toMatchSnapshot();
      done();
    });
  });
  it('return START_REPORTING_SUBSCRIPTION_$ action', done => {
    const action = ActionsObservable.of(startInteractionMonitoring());
    StartBatchRequest(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});

describe('startBatchSubscription', () => {
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(startReportingSubscriptions());
    StartBatchSubscription(action, mockStore).subscribe(() => {
      expect(sdkPromise).toMatchSnapshot();
      done();
    });
  });
  it('return REPORTING_SUBSCRIPTION_STARTED_$ action', done => {
    const action = ActionsObservable.of(startReportingSubscriptions());
    StartBatchSubscription(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
