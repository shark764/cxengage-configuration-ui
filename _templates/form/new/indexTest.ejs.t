---
to: src/containers/Form/<%= name %>/__tests__/index.test.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import <%= name %>Form, {
  mapStateToProps,
  createFormName,
  formSubmission
} from '../';
import {
  getSelectedEntityId,
  isCreating
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => false);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

describe('<%= name %> Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <<%= name %>Form store={store}>Child</<%= name %>Form>
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
  // Change values to match the form your making
  // If you see this in a PR the unit tests may not have been completed
  // const values = { name: 'mockName', value: 'mockValue' };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});