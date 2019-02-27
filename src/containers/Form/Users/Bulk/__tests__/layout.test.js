/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import UsersBulkActionsForm from '../layout';

describe('<UsersBulkActionsForm />', () => {
  it('renders users bulk actions form', () => {
    const rendered = shallow(<UsersBulkActionsForm active={true} handleSubmit={() => {}} />);
    expect(rendered).toMatchSnapshot();
  });
});
