/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import EmailTemplatesDetailsPanel from '../layout';

describe('<EmailTemplatesDetailsPanel />', () => {
  let customVariables;
  beforeEach(() => {
    customVariables = [
      {
        description: 'variable-test-1',
        emailTypeId: '9a96c534-31f9-11e8-88b9-9440dab83f25',
        id: '9abac7f0-31f9-11e8-88b9-9440dab83f25',
        name: 'variable-test-1'
      },
      {
        description: 'variable-test-2',
        emailTypeId: '7a96c534-31f9-11e8-88b9-9440dab83f21',
        id: 'gabac7f0-31f9-11e8-88b9-9440dab83f22',
        name: 'variable-test-2'
      }
    ];
  });
  it('renders emailTemplates detailsPanel', () => {
    const rendered = shallow(
      <EmailTemplatesDetailsPanel
        id="7c96c534-31f9-11e8-33ff-9440dab83f66"
        className="details-panel"
        userHasUpdatePermission={true}
        children={'Mock Child'}
        emailFormValue="new+user@serenova.com"
        variables={customVariables}
        inheritedSubject="Welcome to CxEngage"
        inheritedBody="Hello {{{variable-test-1}}} {{{variable-test-2}}}! Welcome to The Serenova Team!"
        templateEmail="new+user@serenova.com"
        templateShared="true"
        templateSubject="Welcome to CxEngage"
        templateBody="Hello {{{variable-test-1}}} {{{variable-test-2}}}! Welcome to The Serenova Team!"
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
