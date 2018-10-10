/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ChatWidgetsForm from '../layout';

describe('<ChatWidgetsForm />', () => {
  it('renders create chatWidgets', () => {
    const rendered = shallow(
      <ChatWidgetsForm
        name="mockName"
        shared={false}
        welcome="hero"
        fontFamily="arial"
        fontSize="12pt"
        headerColor="#000000"
        headerTextIcons="#000000"
        chatbg="#000000"
        agentHeader="#000000"
        agentText="#000000"
        customerHeader="#000000"
        customerText="#000000"
        systemText="#000000"
        buttonText="#000000"
        iconColor="#000000"
        borderColor="#000000"
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
