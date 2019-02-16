/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import FlowsForm, { mapStateToProps } from '../';
import { getSelectedEntityId, isCreating } from '../../../../redux/modules/entities/selectors';
import { selectFlowVersions, selectFlowNames } from '../../../../redux/modules/entities/flows/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

jest.mock('../../../../redux/modules/entities/flows/selectors');
selectFlowVersions.mockImplementation(() => ({ label: 'v1', value: '0001' }));
selectFlowNames.mockImplementation(() => ['mockName1', 'mockName2']);

describe('flows Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<FlowsForm store={store}>Child</FlowsForm>)).toMatchSnapshot();
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
    type: 'mockType'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
