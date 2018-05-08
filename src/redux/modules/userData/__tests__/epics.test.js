/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { ActionsObservable } from 'redux-observable';
import { mockStore } from 'TestUtils';
import { sdkCall } from '../../../../utils/sdk';
import { updateUserPermissions } from '../index';
import { SetSdkActiveTenant } from '../epics';

import { getCurrentEntity } from '../../entities/selectors';
jest.mock('../../../../utils/sdk');
jest.mock('../../entities/selectors');
getCurrentEntity.mockReturnValue('InteractionMonitoring');

describe('SetSdkActiveTenant', () => {
  beforeEach(() => {
    sdkCall.mockReturnValue(new Promise(resolve => resolve('mock response')));
  });
  afterEach(() => {
    sdkCall.mockClear();
  });
  it('calls the correct sdk function', done => {
    const action = ActionsObservable.of(
      updateUserPermissions('0000-0000-0000-0000', 'mockTenant', [
        { data: 'data1' }
      ])
    );
    SetSdkActiveTenant(action, mockStore).subscribe(() => {
      expect(sdkCall).toBeCalled();
      done();
    });
  });
  it('returns ACTIVE_TENANT_SET_$ action', done => {
    const action = ActionsObservable.of(
      updateUserPermissions('0000-0000-0000-0000', 'mockTenant', [
        { data: 'data1' }
      ])
    );
    SetSdkActiveTenant(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
