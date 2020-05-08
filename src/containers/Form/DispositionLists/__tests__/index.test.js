/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { Map, fromJS } from 'immutable';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import {
  getCurrentForm,
  createFormName,
  formSubmission,
  getCurrentFormValueByFieldName
} from '../../../../redux/modules/form/selectors';
import DispositionListsForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  isSaving,
  isEntityFetching,
  userHasUpdatePermission,
  userHasSharePermission
} from '../../../../redux/modules/entities/selectors';
import {
  dispositionListsInitialValues,
  selectDispositionsHeaders
} from '../../../../redux/modules/entities/dispositionLists/selectors';
import { checkDisableShared } from '../../../../redux/modules/entities/reasonLists/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/entities/dispositionLists/selectors');
jest.mock('../../../../redux/modules/entities/reasonLists/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isSaving.mockImplementation(() => true);
isEntityFetching.mockImplementation(() => false);
userHasUpdatePermission.mockImplementation(() => true);
dispositionListsInitialValues.mockImplementation(() => new Map({ active: true, shared: false, dispositions: [] }));
selectDispositionsHeaders.mockImplementation(() => fromJS([{ name: 'D1', hierarchy: ['H1'] }]));
getCurrentFormValueByFieldName.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
userHasSharePermission.mockImplementation(() => true);
checkDisableShared.mockImplementation(() => false);

describe('DispositionLists Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<DispositionListsForm store={store}>Child</DispositionListsForm>)).toMatchSnapshot();
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
    externalId: 'mockExternalId',
    dispositions: []
  };
  const dispatch = action => action;
  const props = {
    isSaving: true,
    isFetching: false,
    initialized: true,
    dirty: true
  };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
