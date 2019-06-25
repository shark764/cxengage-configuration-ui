/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import CreateTransferListItemsForm, { mapStateToProps } from '../Create';
import { onSubEntityFormSubmit } from '../../../../redux/modules/entities';
import { getCurrentForm, getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';
import {
  getSelectedEntityId,
  getSelectedSubEntityId,
  isSubEntitySaving,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import {
  selectActiveQueueNames,
  selectExistingCategories,
  isUserCreatingNewCategory,
  selectedContactType,
  hierarchyInputText,
  endpointFieldValue,
  transferListItemCreateValues
} from '../../../../redux/modules/entities/transferLists/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/transferLists/selectors');

isSubEntitySaving.mockImplementation(() => true);
getSelectedEntityId.mockImplementation(() => 'mockId');
userHasUpdatePermission.mockImplementation(() => true);
isUserCreatingNewCategory.mockImplementation(() => true);
getCurrentForm.mockImplementation(() => 'gets form from state');
endpointFieldValue.mockImplementation(() => 'mockEndpointValue');
hierarchyInputText.mockImplementation(() => 'mockHierarchyInputValue');
selectActiveQueueNames.mockImplementation(() => 'mockActiveQueueNames');
selectedContactType.mockImplementation(() => 'mockSelectedContactType');
getSelectedSubEntityId.mockImplementation(() => 'mockSelectedSubEntityId');
selectExistingCategories.mockImplementation(() => 'mockExistingCategories');
getCurrentFormValueByFieldName.mockImplementation(() => 'mockTransferListName');
transferListItemCreateValues.mockImplementation(() => 'mockTransferListItemValues');

describe('TransferLists Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<CreateTransferListItemsForm store={store}>Child</CreateTransferListItemsForm>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('formSubmission', () => {
  const values = ['mockEndpoint1', 'mockEndpoint2'];
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(onSubEntityFormSubmit(values, props)).toMatchSnapshot();
  });
});
