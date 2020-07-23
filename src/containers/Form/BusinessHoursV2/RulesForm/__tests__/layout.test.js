// In here I won't be testing the form component itself but the component used to render the field array, since this form purpose
// it's only to render the rules
import React from 'react';
import { shallow } from 'enzyme';

import { RulesFieldArray } from '../layout';

describe('<RulesFieldArray />', () => {
  it('renders the component', () => {
    const fieldNames = ['rules[0]', 'rules[1]'];
    const fieldValues = [
      {
        name: 'rule name',
        id: 'new-rule1'
      },
      {
        name: 'rule name 2',
        id: 'old-rule2'
      }
    ];
    const getMockedFields = (fieldNames, rules) => {
      const field = {
        get: idx => rules[idx],
        remove: () => {},
        push: () => {}
      };
      return {
        map: callback => fieldNames.map((fieldname, idx) => callback(fieldname, idx, field))
      };
    };

    const rendered = shallow(<RulesFieldArray fields={getMockedFields(fieldNames, fieldValues)} addRule={() => {}} />);
    expect(rendered).toMatchSnapshot();
  });
});
