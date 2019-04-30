/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import CustomMetricsForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isInherited,
  isUpdating,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues, getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isInherited.mockImplementation(() => false);
isUpdating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));
getCurrentFormValueByFieldName.mockImplementation(() => 'ignored-abandoned-calls');

describe('CustomMetrics Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<CustomMetricsForm store={store}>Child</CustomMetricsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
