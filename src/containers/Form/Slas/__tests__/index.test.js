/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import SlasForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import {
  selectFormInitialValues,
  formSubmission,
  createFormName,
  getCurrentFormValueByFieldName
} from '../../../../redux/modules/form/selectors';
import {
  selectSlaVersions,
  selectSlaFormInitialValues,
  isSlaTenantDefault
} from '../../../../redux/modules/entities/slas/selectors';
import { checkDisableShared } from '../../../../redux/modules/entities/reasonLists/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));
getCurrentFormValueByFieldName.mockImplementation(() => 'ignore-abandons');

jest.mock('../../../../redux/modules/entities/reasonLists/selectors');
checkDisableShared.mockImplementation(() => false);

jest.mock('../../../../redux/modules/entities/slas/selectors');
selectSlaVersions.mockImplementation(() => []);
selectSlaFormInitialValues.mockImplementation(() => ({ active: true, shared: false }));
isSlaTenantDefault.mockImplementation(() => false);

describe('Slas Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<SlasForm store={store}>Child</SlasForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('createFormName', () => {
  it('returns proper values', () => {
    expect(createFormName()).toMatchSnapshot();
  });
});

describe('formSubmission', () => {
  const values = {
    id: 'mockId',
    name: 'mockName',
    description: 'mockDescription',
    activeVersion: '000'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
