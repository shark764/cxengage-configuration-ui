/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { getCurrentForm, getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';
import RolesForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  isSystemRole
} from '../../../../redux/modules/entities/selectors';
import {
  selectPlatformRoles,
  selectRolesFormInitialValues,
  selectRolesDisableShared
} from '../../../../redux/modules/entities/roles/selectors';

jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/entities/roles/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isInherited.mockImplementation(() => false);
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
isSystemRole.mockImplementation(() => true);
selectRolesFormInitialValues.mockImplementation(() => new Map({ active: true, shared: false }));
getCurrentFormValueByFieldName.mockImplementation(() => true);
selectPlatformRoles.mockImplementation(() => []);
selectRolesDisableShared.mockImplementation(() => false);

describe('Roles Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<RolesForm store={store}>Child</RolesForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
