import React from 'react';
import { shallow, mount } from 'enzyme';
import SidePanelLayout from '../layout';
import { subscribe, unsubscribe } from '../Observable';
jest.mock('../Observable');
describe('SidePanel Layout', () => {
  it('renders the side panel', () => {
    const rendered = shallow(<SidePanelLayout slidingWidth={30} userHasUpdatePermission={true} />);
    expect(rendered).toMatchSnapshot();
  });

  it('calls lifecycle methods', () => {
    const rendered = shallow(<SidePanelLayout slidingWidth={30} userHasUpdatePermission={true} />);
    expect(subscribe).toHaveBeenCalled();
    rendered.unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
