import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../../utils/testUtils';
import EmailTemplatesDetailsPanel, { mapStateToProps } from '../';

jest.mock('../../../../redux/modules/entities/selectors', () => ({
  userHasUpdatePermission: () => true
}));

jest.mock('../../../../redux/modules/emailTemplates/selectors', () => ({
  getEmailTemplateFormValue: () => 'mock email template form value'
}));

jest.mock('../selectors', () => ({
  getVariables: () => ['mock variable'],
  getInheritedSubject: () => 'mock inherited subject',
  getInheritedBody: () => 'mock inherited body',
  getTemplateEmail: () => 'mock template email',
  getTemplateShared: () => 'mock template shared',
  getTemplateSubject: () => 'mock template subject',
  getTemplateBody: () => 'mock template body'
}));

describe('EmailTemplatesDetailsPanel', () => {
  it('renders', () => {
    shallow(
      <EmailTemplatesDetailsPanel store={mockStore}>
        Child
      </EmailTemplatesDetailsPanel>
    );
  });
});

describe('mapStateToProps', () => {
  it('maps the selectors to the object correctly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
