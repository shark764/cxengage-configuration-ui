/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import GenericBulkItemsForm, { mapStateToProps, createFormName } from '../';
import { getCurrentEntity, isSaving, isBulkUpdating } from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentEntity.mockImplementation(() => 'mockEntity');
isSaving.mockImplementation(() => true);
isBulkUpdating.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => fromJS({ active: true }));

describe('GenericBulkItems Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<GenericBulkItemsForm store={store}>Child</GenericBulkItemsForm>)).toMatchSnapshot();
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
