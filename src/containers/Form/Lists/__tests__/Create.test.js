/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../../utils/testUtils';
import CreateListForm, { mapStateToProps } from '../Create';

jest.mock('../../../../redux/modules/entities/selectors', () => ({
  isCreating: () => 'mock is creating'
}));

jest.mock('../../../../redux/modules/entities/listTypes/selectors', () => ({
  getListTypesOptions: () => 'mock list types options'
}));

describe('CreateListForm', () => {
  it('renders', () => {
    shallow(<CreateListForm store={mockStore}>Child</CreateListForm>);
  });
});

describe('mapStateToProps', () => {
  it('maps the selectors to the object correctly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
