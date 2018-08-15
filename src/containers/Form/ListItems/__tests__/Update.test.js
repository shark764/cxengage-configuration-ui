/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../../utils/testUtils';
import UpdateListItemsForm, {
  mapStateToProps,
  mapDispatchToProps
} from '../Update';
import {
  getSelectedEntityName,
  isSubEntitySaving,
  getSelectedSubEntityId
} from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities', () => ({
  setSelectedSubEntityId: () => 'mock selected sub entity'
}));

jest.mock('../../../../redux/modules/entities', () => ({
  onSubEntityFormSubmit: () => 'mock is submitting'
}));

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntityName.mockImplementation(() => 'mockName');
getSelectedSubEntityId.mockImplementation(() => 'mockSubEntityId');
isSubEntitySaving.mockImplementation(() => false);

jest.mock('../selectors', () => ({
  getFieldItems: () => 'mock field items',
  getUpdateFieldItems: () => 'mock update field items',
  getInitialValues: () => 'mock initial values'
}));

describe('UpdateListItemsForm', () => {
  it('renders', () => {
    shallow(<UpdateListItemsForm store={mockStore}>Child</UpdateListItemsForm>);
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object updated from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('maps the dispatch to the props correctly', () => {
    expect(mapDispatchToProps()).toMatchSnapshot();
  });
});
