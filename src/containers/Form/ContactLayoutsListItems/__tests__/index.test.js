/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import CreateUpdateContactLayoutsListItemsForm, { mapStateToProps } from '../';

import {
  isSubEntitySaving,
  getSelectedEntityId,
  getSelectedSubEntityId,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import {
  getExistingCategories,
  getAvailableContactAttributesNames,
  getExistingCategoryNamesInCurrentLayout,
  getContactLayoutsSubEntityFormSubmitValues,
  getContactLayoutsSubEntityFormInitialValues
} from '../../../../redux/modules/entities/contactLayouts/selectors';
import { getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';
import { onSubEntityFormSubmit } from '../../../../redux/modules/entities';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/entities/contactLayouts/selectors');
jest.mock('../../../../redux/modules/form/selectors');

isSubEntitySaving.mockImplementation(() => true);
getSelectedEntityId.mockImplementation(() => 'mockId');
getSelectedSubEntityId.mockImplementation(() => 'mockSelectedSubEntityId');
userHasUpdatePermission.mockImplementation(() => true);

getExistingCategories.mockImplementation(() => 'mockExistingCategories');
getAvailableContactAttributesNames.mockImplementation(() => 'mockAvailableCategories');
getExistingCategoryNamesInCurrentLayout.mockImplementation(() => 'mockCategoryNames');
getContactLayoutsSubEntityFormInitialValues.mockImplementation(() => 'mockInitialValues');
getContactLayoutsSubEntityFormSubmitValues.mockImplementation(() => 'mockSubmitValues');

getCurrentFormValueByFieldName.mockImplementation(() => 'mockContactLayout1');

describe('ContactLayoutsListItemsForm Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(<CreateUpdateContactLayoutsListItemsForm store={store}>Child</CreateUpdateContactLayoutsListItemsForm>)
    ).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('formSubmission', () => {
  const values = { hierarchy: 'mockHierarchy', label: 'mockLabel' };
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(onSubEntityFormSubmit(values, props)).toMatchSnapshot();
  });
});
