/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../../utils/testUtils';
import CreateListItemsForm, { mapStateToProps, mapDispatchToProps } from '../Create';
import {
  getSelectedEntityName,
  isSubEntitySaving
} from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities', () => ({
  setSelectedSubEntityId: () => 'mock selected sub entity'
}));

jest.mock('../../../../redux/modules/entities', () => ({
  onSubEntityFormSubmit: () => 'mock is submitting'
}));

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntityName.mockImplementation(() => 'mockName');
isSubEntitySaving.mockImplementation(() => false);

jest.mock('../selectors', () => ({
  getFieldItems: () => 'mock field items'
}));

describe('CreateListItemsForm', () => {
  it('renders', () => {
    shallow(<CreateListItemsForm store={mockStore}>Child</CreateListItemsForm>);
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('maps the dispatch to the props correctly', () => {
    expect(mapDispatchToProps()).toMatchSnapshot();
  });
});