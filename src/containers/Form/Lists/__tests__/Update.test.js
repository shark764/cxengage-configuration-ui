/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import UpdateListsForm, { mapStateToProps } from '../Update';
import { getSelectedEntityId, isUpdating } from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isUpdating.mockImplementation(() => false);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

jest.mock('../../../../redux/modules/entities/lists/selectors', () => ({
  getListTypeName: () => 'mock list type name',
  getInitialUpdateFormValues: () => 'mock initial update form values'
}));

jest.mock('../../../../redux/modules/entities/listTypes/selectors', () => ({
  getListTypesOptions: () => 'mock list types options'
}));

describe('UpdateListsForm Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<UpdateListsForm store={store}>Child</UpdateListsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
