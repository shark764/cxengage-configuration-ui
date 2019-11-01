/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { fromJS } from 'immutable';
import { shallow } from 'enzyme';

import GenericBulkItemsForm from '../layout';

describe('<GenericBulkItemsForm />', () => {
  it('renders generic bulk actions form', () => {
    const rendered = shallow(
      <GenericBulkItemsForm
        active={true}
        isBulkUpdating={true}
        initialValues={fromJS({ active: false })}
        isSaving={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
