/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import CustomAttributesForm, { mapStateToProps } from '../';
import { onFormSubmit } from '../../../../redux/modules/entities/index';
import {
  selectFormInitialValues,
  createFormName,
  getCurrentFormValueByFieldName
} from '../../../../redux/modules/form/selectors';
import {
  isCreating,
  isInherited,
  getSelectedEntityId,
  userHasUpdatePermission,
  getCurrentEntity
} from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');

isCreating.mockImplementation(() => true);
isInherited.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
getSelectedEntityId.mockImplementation(() => 'mock Id');
getCurrentEntity.mockImplementation(() => 'mock entity');
getCurrentFormValueByFieldName.mockImplementation(() => 'mock value');
selectFormInitialValues.mockImplementation(() => 'mock initial form values');

describe('customAttributes Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<CustomAttributesForm store={store}>Child</CustomAttributesForm>)).toMatchSnapshot();
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
    identifier: 'mockId',
    name: 'mockName',
    description: 'mockDescription',
    dataType: 'text',
    initialValue: 100,
    defaultValue: 200,
    realtime: true,
    historical: true
  };
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(onFormSubmit(values, props)).toMatchSnapshot();
  });
});
