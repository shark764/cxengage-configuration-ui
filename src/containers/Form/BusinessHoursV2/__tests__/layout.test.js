/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import BusinessHoursV2Form from '../layout';

describe('<BusinessHoursV2Form />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <BusinessHoursV2Form
        initialValues={Map({
          shared: false
        })}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        userHasSharePermission
        toggleShared={() => {}}
        sharedFormValue
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <BusinessHoursV2Form
        initialValues={Map({
          shared: true,
          id: 'mock-id'
        })}
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        userHasSharePermission
        toggleShared={() => {}}
        sharedFormValue
        versions={[
          {
            name: 'version-1',
            id: 'id-1'
          },
          {
            name: 'version-2',
            id: 'id-2'
          }
        ]}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
