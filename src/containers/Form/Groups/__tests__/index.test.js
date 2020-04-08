/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import GroupsForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasPermissions
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isInherited.mockImplementation(() => false);
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
userHasPermissions.mockImplementation(() => false);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

describe('Groups Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<GroupsForm store={store}>Child</GroupsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
