/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import GenericBulkItemsForm from '../layout';

describe('<GenericBulkItemsForm />', () => {
  it('renders create customMetric', () => {
    const rendered = shallow(<GenericBulkItemsForm active={true} handleSubmit={() => {}} />);
    expect(rendered).toMatchSnapshot();
  });
});
