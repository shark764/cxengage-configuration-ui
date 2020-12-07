/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import IdentityProvidersForm, { mapStateToProps } from '../';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import {
  selectFormInitialValues,
  formSubmission,
  createFormName
} from '../../../../redux/modules/form/selectors';
import { shallowWithIntl } from '../../../../utils/testUtils';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));

describe('Identity Providers Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    const wrapper = (<IdentityProvidersForm store={store}>Child</IdentityProvidersForm>);
    expect(shallowWithIntl(wrapper)).toMatchSnapshot();
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
    name: "mockName",
    description: "mockDescription",
    identityProviderType: "mockType",
    emailMapping: "mockEmailMapping",
    metadataUrl: "mockMetadataUrl",
    identityProvider: "00000000000000000000"
  };
  const dispatch = action => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
