import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { fromJS, List } from 'immutable';

import UserProfilePage, { mapStateToProps, mapDispatchToProps } from '../';

import {
  userHasUpdatePermission,
  userHasPermissions,
  getConfirmationDialogType,
  getNextEntity,
} from '../../../../redux/modules/entities/selectors';
import { getFormValues } from '../../../../redux/modules/form/selectors';
import {
  selectUserTenants,
  isSaving,
  userProfileInitialValues,
} from '../../../../redux/modules/entities/userProfile/selectors';

jest.mock('redux-form/immutable', () => ({
  ...jest.requireActual('redux-form/immutable'),
  isDirty: () => () => false,
}));

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/userProfile/selectors');

userHasUpdatePermission.mockReturnValue(true);
userHasPermissions.mockReturnValue(true);
getConfirmationDialogType.mockReturnValue('A_DIALOG_TYPE');
getNextEntity.mockReturnValue('nextEntity');

getFormValues.mockReturnValue(
  List([
    {
      type: 'WebRTC',
      name: 'somebody',
      id: 'an-id',
      hide: false,
    },
    {
      type: 'PSTN',
      name: 'whoever',
      id: 'another-id',
      hide: false,
    },
  ])
);

selectUserTenants.mockReturnValue([
  {
    value: 'tenant1-id',
    label: 'tenant 1',
  },
  {
    value: 'tenant2-id',
    label: 'tenant 2',
  },
]);
isSaving.mockReturnValue(false);
userProfileInitialValues.mockReturnValue(
  fromJS({
    email: 'email@email.com',
    firstName: 'Whatever',
    lastName: 'Whoever',
    defaultTenant: 'tenant-id',
    extensions: [
      {
        type: 'WebRTC',
        name: 'whatever',
        id: 'an-id',
        hide: false,
      },
      {
        type: 'PSTN',
        name: 'someone',
        id: 'another-id',
        hide: false,
      },
    ],
    skills: [
      {
        name: 'skill 1',
      },
      {
        name: 'skill 2',
      },
    ],
    groups: [
      {
        name: 'group 1',
      },
      {
        name: 'group 2',
      },
    ],
    externalId: 'external-id',
    defaultIdentityProvider: 'identityProvider',
    noPassword: false,
    workStationId: 'workstation-id',
  })
);

describe('UserProfilePage', () => {
  it('renders', () => {
    const store = createStore((state) => state);
    expect(shallow(<UserProfilePage store={store} />)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('maps properly', () => {
    expect(mapDispatchToProps).toMatchSnapshot();
  });
});
