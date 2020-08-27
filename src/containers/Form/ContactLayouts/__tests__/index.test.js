/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */
import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import ContactLayoutsForm, { mapStateToProps } from '../';

import {
  isSaving,
  isInherited,
  isEntityFetching,
  getCurrentEntity,
  getSelectedEntityId,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import {
  selectContactLayoutsHeaders,
  getContactLayoutsFormSubmitValues,
  getMissingMandatoryAttributesNames,
  getContactLayoutsFormInitialValues,
  isCurrentFormMissingMandatoryAttributes
} from '../../../../redux/modules/entities/contactLayouts/selectors';
import { onFormSubmit } from '../../../../redux/modules/entities/index';
import { createFormName, getCurrentForm } from '../../../../redux/modules/form/selectors';
import { removeContactLayoutsListItem } from '../../../../redux/modules/entities/contactLayouts/actions';

jest.mock('../../../../redux/modules/form/selectors');
jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/entities/contactLayouts/selectors');
jest.mock('../../../../redux/modules/entities/contactLayouts/actions');

getCurrentForm.mockImplementation(() => 'mockForm');

isSaving.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
isEntityFetching.mockImplementation(() => false);
getCurrentEntity.mockImplementation(() => 'contactLayouts');
getSelectedEntityId.mockImplementation(() => 'mockId');
userHasUpdatePermission.mockImplementation(() => true);

selectContactLayoutsHeaders.mockImplementation(() => 'mockLayoutHeaders');
getContactLayoutsFormSubmitValues.mockImplementation(() => 'mock submit values');
getMissingMandatoryAttributesNames.mockImplementation(() => []);
getContactLayoutsFormInitialValues.mockImplementation(() => 'mockInitialValues');
isCurrentFormMissingMandatoryAttributes.mockImplementation(() => false);

removeContactLayoutsListItem.mockImplementation(() => {});

describe('contactLayouts Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<ContactLayoutsForm store={store}>Child</ContactLayoutsForm>)).toMatchSnapshot();
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
    name: 'mockName',
    description: 'mockDescription',
    layout: [{ name: 'mockLayout1' }],
    active: true
  };
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(onFormSubmit(values, props)).toMatchSnapshot();
  });
});
