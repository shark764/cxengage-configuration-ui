/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { ActionsObservable } from 'redux-observable';
import { mockStore } from '../../../../../utils/testUtils';
import { FetchBranding } from '../epics';
import { fetchBranding } from '../actions';

describe('FetchBranding', () => {
  it('calls fetch data for branding and protectedBranding', done => {
    const action = ActionsObservable.of(fetchBranding());
    FetchBranding(action, mockStore).subscribe(actualOutputActions => {
      expect(actualOutputActions).toMatchSnapshot();
      done();
    });
  });
});
