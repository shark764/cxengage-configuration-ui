/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import UpdateEmailTemplateForm, { mapStateToProps } from '../';

jest.mock('../../../../redux/modules/entities/selectors', () => ({
  getSelectedEntityId: () => 'mockSelectedEntityId',
  isUpdating: () => 'mock is updating'
}));

jest.mock('../../../../redux/modules/emailTemplates/selectors', () => ({
  getEmailTemplateFormValue: () => 'mock email template form value'
}));

jest.mock('../selectors', () => ({
  getInitialValues: () => 'mock initial values',
  getTemplates: () => 'mock templates'
}));

describe('EmailTemplatesDetailsPanel', () => {
  it('renders', () => {
    const store = createStore(state => state);
    shallow(
      <UpdateEmailTemplateForm store={store}>Child</UpdateEmailTemplateForm>
    );
  });
});

describe('mapStateToProps', () => {
  it('maps properly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
