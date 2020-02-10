/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { ActionsObservable } from 'redux-observable';
import { mockStore } from '../../../../../utils/testUtils';
import { sdkPromise } from '../../../../../utils/sdk';
import { from } from 'rxjs'; // unit tests fail without this import

import { FetchData, ReInitCustomAttributesForm } from '../epics';

jest.mock('../../../../../utils/sdk');
from && from.mockReturnValue(undefined); // this disables the esLint "no-unused-var" error
sdkPromise.mockReturnValue(new Promise(resolve => resolve('mock response')));

describe('Custom Attributes Epics tests', () => {
  it('FetchData', done => {
    const action = ActionsObservable.of({
      type: 'FETCH_DATA',
      entityName: 'customAttributes'
    });
    FetchData(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
  it('ReInitCustomAttributesForm', done => {
    const action = ActionsObservable.of({
      type: 'UPDATE_ENTITY_FULFILLED',
      entityName: 'customAttributes',
      entityId: 'mockId',
      response: {
        result: {
          identifier: 'mockIdentifier',
          name: 'mockName'
        }
      }
    });
    ReInitCustomAttributesForm(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
