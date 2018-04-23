import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
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
    const store = createStore(state => state);
    shallow(
      <EmailTemplatesDetailsPanel store={store}>
        Child
      </EmailTemplatesDetailsPanel>
    );
  });
});

describe('mapStateToProps', () => {
  it('maps properly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
