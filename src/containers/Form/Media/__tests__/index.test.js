/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import MediaForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
} from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

describe('Media Renders', () => {
  it('renders', () => {
    const store = createStore((state) => state);
    expect(shallow(<MediaForm store={store}>Child</MediaForm>)).toMatchSnapshot();
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
  // ERASE THIS COMMENTS AFTER YOUR ENTITY IS GENERATED
  const values = {
    id: 'mockId',
    name: 'mockName',
    description: 'mockDescription',
    type: 'mockType',
  };
  const dispatch = (action) => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
