/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import CustomMetricsForm, {
  mapStateToProps,
  createFormName,
  formSubmission
} from '../';
import {
  getSelectedEntityId,
  isInherited,
  isUpdating
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';
import {
  getAbandonTypeFormValue
} from '../../../../redux/modules/entities/customMetrics/selectors';

jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isUpdating.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

describe('CustomMetrics Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <CustomMetricsForm store={store}>Child</CustomMetricsForm>
      )
    ).toMatchSnapshot();
  });
});

jest.mock('../../../../redux/modules/entities/customMetrics/selectors');
getAbandonTypeFormValue.mockImplementation(() => 'ignored-abandoned-calls');

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
    customMetricsId: 'mockId',
    customMetricsName: 'mockName',
    description: 'mockDescription',
    customMetricsType: 'SLA',
    slaAbandonType: 'ignored-abandoned-calls',
    slaThreshold: 20,
    slaAbandonThreshold: 20
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});