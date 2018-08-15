/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import OutboundIdentifiersForm, {
  mapStateToProps,
  createFormName,
  formSubmission
} from '../';
import {
  getSelectedEntityId,
  isCreating
} from '../../../../redux/modules/entities/selectors';
import { selectFlowIds } from '../../../../redux/modules/entities/flows/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/entities/flows/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => false);
selectFlowIds.mockImplementation(() => [
  { value: 'mockValue', label: 'mockLabel' }
]);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

describe('OutboundIdentifiersForm Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <OutboundIdentifiersForm store={store}>Child</OutboundIdentifiersForm>
      )
    ).toMatchSnapshot();
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
  const values = { name: 'mockName', value: 'mockValue' };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});