import React from 'react';
import { shallow } from 'enzyme';
import EmailTemplatesLayout from '../Layout';

describe('EmailTemplates Layout', () => {
  test('Renders correctly', () => {
    const component = shallow(<EmailTemplatesLayout />);
    expect(component).toMatchSnapshot();
  });
});
