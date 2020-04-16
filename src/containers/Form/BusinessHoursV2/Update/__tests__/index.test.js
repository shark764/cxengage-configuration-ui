/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import UpdateBusinessHoursV2Form, { mapStateToProps } from '../';
import { getSelectedEntityId } from '../../../../../redux/modules/entities/selectors';
import { formSubmission, createFormName } from '../../../../../redux/modules/form/selectors';

jest.mock('../../../../../redux/modules/entities/selectors');
jest.mock('../../../../../redux/modules/form/selectors');

getSelectedEntityId.mockImplementation(() => 'mockId');

describe('BusinessHoursV2 Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<UpdateBusinessHoursV2Form store={store}>Child</UpdateBusinessHoursV2Form>)).toMatchSnapshot();
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
