import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import DraftForm from '../layout';

describe('<DraftForm />', () => {
  it('renders the component', () => {
    const rendered = shallow(
      <DraftForm
        initialValues={Map({
          created: new Date('1995-12-17T03:24:00'),
          updated: new Date('1995-12-17T03:24:00')
        })}
        userHasUpdatePermission
        handleSubmit={() => {}}
        timezones={[
          {
            value: 'timezone1',
            label: 'timezone 1'
          },
          {
            value: 'timezone2',
            label: 'Timezone 2'
          }
        ]}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
