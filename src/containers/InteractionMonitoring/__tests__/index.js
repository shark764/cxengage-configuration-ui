import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import InteractionMonitoring from '../';

it('Basic render no props', () => {
  shallow(<InteractionMonitoring />);
});

test('Renders correctly', () => {
  const component = renderer.create(<InteractionMonitoring />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
