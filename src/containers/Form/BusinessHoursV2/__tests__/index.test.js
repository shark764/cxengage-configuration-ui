/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import BusinessHoursV2Form, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
  userHasSharePermission
} from '../../../../redux/modules/entities/selectors';
import {
  formSubmission,
  createFormName,
  getCurrentFormValueByFieldName
} from '../../../../redux/modules/form/selectors';
import {
  selectBusinessHoursV2FormInitialValues,
  selectBusinessHoursEntityVersions
} from '../../../../redux/modules/entities/businessHoursV2/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/businessHoursV2/selectors');

getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
isInherited.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
userHasSharePermission.mockImplementation(() => true);

getCurrentFormValueByFieldName.mockImplementation(() => true);

selectBusinessHoursV2FormInitialValues.mockImplementation(() => ({ active: true }));
selectBusinessHoursEntityVersions.mockImplementation(() => ({ versions: [] }));

describe('BusinessHoursV2 Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<BusinessHoursV2Form store={store}>Child</BusinessHoursV2Form>)).toMatchSnapshot();
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
    shared: true
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
