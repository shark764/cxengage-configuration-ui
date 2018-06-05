/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../../utils/testUtils';
import UpdateListForm, { mapStateToProps } from '../Update';

jest.mock('../../../../redux/modules/entities/selectors', () => ({
  isInherited: () => 'mock is inherited',
  isUpdating: () => 'mock is updating'
}));

jest.mock('../../../../redux/modules/entities/lists/selectors', () => ({
  getListTypeName: () => 'mock list type name',
  getInitialUpdateFormValues: () => 'mock initial update form values'
}));

describe('UpdateListForm', () => {
  it('renders', () => {
    shallow(<UpdateListForm store={mockStore}>Child</UpdateListForm>);
  });
});

describe('mapStateToProps', () => {
  it('maps the selectors to the object correctly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
