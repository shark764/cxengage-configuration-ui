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

jest.mock(
  '../../../../redux/modules/entities/emailTemplates/selectors',
  () => ({
    getInitialFormValues: () => 'mock initial values',
    getEmailTemplateFormValue: () => 'mock email template form value',
    getTemplates: () => 'mock templates'
  })
);

describe('UpdateEmailTemplateForm', () => {
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
