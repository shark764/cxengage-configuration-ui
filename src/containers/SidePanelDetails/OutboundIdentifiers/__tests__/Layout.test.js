import React from 'react';
import { shallow } from 'enzyme';
import OutboundIdentifiersSiePanelDetailsLayout from '../Layout';

describe('OutboundIdentifiersSiePanelDetailsLayout Layout', () => {
  it('renders ', () => {
    const component = shallow(<OutboundIdentifiersSiePanelDetailsLayout />);
    expect(component).toMatchSnapshot();
  });
});
