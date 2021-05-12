/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import FacebookIntegrationsForm, { mapStateToProps } from '../';
import {
  getSelectedEntityId,
  userHasUpdatePermission,
  isCreating,
  isEntityFetching
} from '../../../../redux/modules/entities/selectors';
import { formSubmission, createFormName } from '../../../../redux/modules/form/selectors';
import { selectFacebookIntegrationsFormInitialValues } from '../../../../redux/modules/entities/facebookIntegrations/selectors';
import { fromJS } from 'immutable';
import {
  getDigitalChannelsAppIds,
  getDigitalChannelsApp
} from '../../../../redux/modules/entities/chatWidgets/selectors';


jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isCreating.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);

jest.mock('../../../../redux/modules/entities/facebookIntegrations/selectors');
selectFacebookIntegrationsFormInitialValues.mockImplementation(() => (undefined));

jest.mock('../../../../redux/modules/entities/chatWidgets/selectors');
getDigitalChannelsAppIds.mockReturnValue('mock-app-ids');
getDigitalChannelsApp.mockReturnValue('mock-app');

describe('FacebookIntegrations Renders', () => {
  it('renders', () => {
    const store = createStore((state) => state);
    expect(shallow(<FacebookIntegrationsForm store={store}>Child</FacebookIntegrationsForm>)).toMatchSnapshot();
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
    appId: 'mockAppId',
    facebookAppId: 'mockFacebookAppId',
    facebookAppSecret: 'mockFacebookAppSecret',
    facebookPageId: 'mockFacebookPageId',
    facebookUserAccessToken: 'mockFacebookUserAccessToken',
    clientDisconnectMinutes: 1,
  };
  const dispatch = (action) => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
