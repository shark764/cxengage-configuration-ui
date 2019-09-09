/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import MessageTemplatesForm from '../layout';

describe('<MessageTemplatesForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <MessageTemplatesForm
        isSaving={false}
        selectedEntityId="create"
        initialValues="mockInitialValues"
        userHasUpdatePermission={true}
        channels={List(['mockChannels'])}
        templateText="mockTemplateText"
        templateTextType="plaintext"
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <MessageTemplatesForm
        isSaving={false}
        selectedEntityId="mockEntityId"
        initialValues="mockInitialValues"
        userHasUpdatePermission={true}
        channels={List(['mockChannels'])}
        templateText="mockTemplateText"
        templateTextType="html"
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
