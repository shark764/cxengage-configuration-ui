/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import CreateListsForm, { mapStateToProps } from '../Create';
import { getSelectedEntityId, isCreating } from '../../../../redux/modules/entities/selectors';
import { selectFormInitialValues } from '../../../../redux/modules/form/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => false);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

jest.mock('../../../../redux/modules/entities/listTypes/selectors', () => ({
  getListTypesOptions: () => 'mock list types options'
}));

describe('CreateListsForm Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<CreateListsForm store={store}>Child</CreateListsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
