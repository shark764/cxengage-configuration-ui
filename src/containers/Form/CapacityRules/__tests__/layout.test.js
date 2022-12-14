/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import CapacityRulesForm from '../layout';

describe('<CapacityRulesForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <CapacityRulesForm
        name="mockName"
        description="mockDescription"
        type="mockType"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        intl={{
          formatMessage: ({ defaultMessage }) => defaultMessage,
        }}
        initialValues={Map({
          name: 'whatever',
        })}
        versions={[]}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <CapacityRulesForm
        name="mockName"
        description="mockDescription"
        type="mockType"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        intl={{
          formatMessage: ({ defaultMessage }) => defaultMessage,
        }}
        initialValues={Map({
          name: 'whatever',
          id: 'test',
        })}
        versions={['version1', 'version2']}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
