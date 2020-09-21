import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../utils/testUtils';
import FlowsLayout from '../';

describe('FlowsLayout Renders', () => {
  it('renders', () => {
    const rendered = shallow(<FlowsLayout store={mockStore} />);
    expect(rendered).toMatchSnapshot();
  });
});
