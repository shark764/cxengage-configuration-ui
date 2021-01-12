/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import { getCurrentForm } from '../../../../redux/modules/form/selectors';
import WhatsappIntegrationsForm, { mapStateToProps } from '../';
import { getSelectedEntityId, isSaving, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { selectWhatsappApps } from '../../../../redux/modules/entities/whatsappIntegrations/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../../redux/modules/form/selectors';
import { fromJS } from 'immutable';

jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/form/selectors');
getCurrentForm.mockImplementation(() => 'gets form from state');
getSelectedEntityId.mockImplementation(() => 'mockId');
isSaving.mockImplementation(() => true);
userHasUpdatePermission.mockImplementation(() => true);
selectFormInitialValues.mockImplementation(() => ({ active: true }));
jest.mock('../../../../redux/modules/entities/whatsappIntegrations/selectors');
selectWhatsappApps.mockImplementation(() =>
  fromJS([
    {
      value: 'mockWhatsappAppId',
      label: 'mockWhatsappAppName',
    },
  ])
);

describe('WhatsappIntegrations Renders', () => {
  it('renders', () => {
    const store = createStore((state) => state);
    expect(shallow(<WhatsappIntegrationsForm store={store}>Child</WhatsappIntegrationsForm>)).toMatchSnapshot();
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
    whatsappId: 'mockId',
    name: 'mockName',
    description: 'mockDescription',
    clientDisconnectMinutes: 15,
  };
  const dispatch = (action) => action;
  const props = { dirty: true };
  it('returns proper values', () => {
    expect(formSubmission(values, dispatch, props)).toMatchSnapshot();
  });
});
