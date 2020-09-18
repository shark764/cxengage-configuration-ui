/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import ContactAttributesForm, { mapStateToProps } from '../';

import { createFormName } from '../../../../redux/modules/form/selectors';

import {
  getSelectedEntityId,
  isSaving,
  isInherited,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';
import {
  selectContactAttributeFormInitalValues,
  getContactAttributesFormSubmitValues
} from '../../../../redux/modules/entities/contactAttributes/selectors';
import { onFormSubmit } from '../../../../redux/modules/entities';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');

isSaving.mockImplementation(() => true);
isInherited.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
getSelectedEntityId.mockImplementation(() => 'mock Id');

jest.mock('../../../../redux/modules/entities/contactAttributes/selectors');

getContactAttributesFormSubmitValues.mockImplementation(() => 'mock submit form value');
selectContactAttributeFormInitalValues.mockImplementation(() => 'mock initial form values');

describe('contactAttributes Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<ContactAttributesForm store={store}>Child</ContactAttributesForm>)).toMatchSnapshot();
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
    identifier: 'mockId',
    name: 'mockName',
    description: 'mockDescription',
    dataType: 'text',
    realtime: true,
    historical: true
  };
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(onFormSubmit(values, props)).toMatchSnapshot();
  });
});
