/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import { mapStateToProps } from '../';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues, createFormName, formSubmission } from '../../../../redux/modules/form/selectors';
import { getCurrentSharedValue } from '../../../../redux/modules/entities/reasons/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/reasons/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => new Map({ active: true, shared: false }));
getCurrentSharedValue.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);

describe('reasons Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<reasonsForm store={store}>Child</reasonsForm>)).toMatchSnapshot();
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
    shared: true,
    active: false,
    externalId: 'mockExternalId'
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
