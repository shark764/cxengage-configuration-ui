/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import DataAccessReportsDetailsPanel, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  getCurrentEntity,
  userHasUpdatePermission,
  isSaving
} from '../../../../redux/modules/entities/selectors';
import { selectEntityListMembers, filterUsersByPermissions } from '../../../../redux/modules/entities/users/selectors';
import { setSelectedSubEntityId, removeListItem } from '../../../../redux/modules/entities';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(
  () =>
    new Map({
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: true,
      reportType: 'realtime',
      realtimeReportType: 'standard',
      realtimeReportName: 'IVR Interactions',
      members: [
        {
          id: 'mockSubEntityId'
        }
      ]
    })
);
getCurrentEntity.mockImplementation(() => 'dataAccessReports');
userHasUpdatePermission.mockImplementation(() => true);
isSaving.mockImplementation(() => false);

jest.mock('../../../../redux/modules/entities/users/selectors');
selectEntityListMembers.mockImplementation(() => ['mockListMembers']);
filterUsersByPermissions.mockImplementation(() => ['mockListMembers']);

jest.mock('../../../../redux/modules/entities');
removeListItem.mockImplementation(() => 'mockId');
setSelectedSubEntityId.mockImplementation(() => 'mockId');

describe('DataAccessReportsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(<DataAccessReportsDetailsPanel store={store}>Child</DataAccessReportsDetailsPanel>)
    ).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
