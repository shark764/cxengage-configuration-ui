import React from 'react';
import { shallow } from 'enzyme';
import SidePanelLayout from '../layout';
import { subscribe, unsubscribe } from '../Observable';
jest.mock('../Observable');
describe('SidePanel Layout', () => {
  it('renders the side panel', () => {
    const rendered = shallow(<SidePanelLayout slidingWidth={30} userHasCurrentFormPermission={true} />);
    expect(rendered).toMatchSnapshot();
  });

  it('calls lifecycle methods', () => {
    const rendered = shallow(<SidePanelLayout slidingWidth={30} userHasCurrentFormPermission={true} />);
    expect(subscribe).toHaveBeenCalled();
    rendered.unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
