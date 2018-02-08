import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import SupervisorToolbar from '../';

it('Basic render no props', () => {
  const wrapper = shallow(<SupervisorToolbar />);

  expect(wrapper.instance().checkBoxChecked()).equals(true);
});

test('Renders correctly', () => {
  const component = renderer.create(<SupervisorToolbar />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
