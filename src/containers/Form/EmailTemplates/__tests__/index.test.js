/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../../utils/testUtils';
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
    shallow(
      <UpdateEmailTemplateForm store={mockStore}>Child</UpdateEmailTemplateForm>
    );
  });
});

describe('mapStateToProps', () => {
  it('maps the selectors to the object correctly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
