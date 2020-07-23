import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';

import UpdateBusinessHoursV2FullPagePanel, { mapStateToProps, actions } from '../';

import {
  selectBusinessHoursEntityVersions,
  selectRules,
  selectDrafts,
  isCreatingDraft,
  getSelectedBusinessHourV2Version,
  selectBusinessHoursV2Data
} from '../../../../../redux/modules/entities/businessHoursV2/selectors';

import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasSharePermission,
  userHasPermissions,
  getEntityParentTenantName
} from '../../../../../redux/modules/entities/selectors';

jest.mock('../../../../../redux/modules/entities/businessHoursV2/selectors');
jest.mock('../../../../../redux/modules/entities/selectors');

selectBusinessHoursEntityVersions.mockReturnValue([
  {
    id: 'business-hour-id ',
    name: 'business hour 1'
  },
  {
    id: 'business-hours-id2',
    name: 'business hour 2'
  }
]);
selectRules.mockReturnValue([
  {
    name: 'rule 1'
  },
  {
    name: 'rule 2'
  }
]);
selectDrafts.mockReturnValue([
  {
    id: 'draft1',
    name: 'draft 1',
    version: 'Draft'
  },
  {
    id: 'draft2',
    name: 'draft 2',
    version: 'Draft'
  }
]);
isCreatingDraft.mockReturnValue(false);
getSelectedBusinessHourV2Version.mockReturnValue('mock-selected-version');
selectBusinessHoursV2Data.mockReturnValue([
  {
    id: 'business-hour-id ',
    name: 'business hour 1'
  },
  {
    id: 'business-hours-id2',
    name: 'business hour 2'
  }
]);

getSelectedEntityId.mockReturnValue('mock-seledted-business-hour');
isInherited.mockReturnValue(false);
isCreating.mockReturnValue(false);
userHasUpdatePermission.mockReturnValue(true);
userHasSharePermission.mockReturnValue(true);
userHasPermissions.mockReturnValue(true);
getEntityParentTenantName.mockReturnValue('Parent Tenant');

describe('UpdateBusinessHoursV2FullPagePanel', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(<UpdateBusinessHoursV2FullPagePanel store={store}>Child</UpdateBusinessHoursV2FullPagePanel>)
    ).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('Actions', () => {
  it('map properly', () => {
    expect(actions).toMatchSnapshot();
  });
});
