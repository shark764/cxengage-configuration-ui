/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ReasonsBulkActionsForm from '../layout';
import { fromJS } from 'immutable';

describe('<ReasonsBulkActionsForm />', () => {
  it('renders reasons bulk actions form', () => {
    const rendered = shallow(
      <ReasonsBulkActionsForm
        entityName={`reasons`}
        initialValues={fromJS({ shared: false })}
        sharedIsChecked={true}
        isSaving={true}
        change={() => {}}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
