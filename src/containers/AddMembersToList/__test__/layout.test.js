import React from 'react';
import { shallow } from 'enzyme';
import AddMemberToListLayout from '../layout';

describe('AddMemberToListLayout Layout', () => {
  it('thing', () => {});

  it('renders the AddMemberToListLayout', () => {
    const rendered = shallow(
      <AddMemberToListLayout
        onCancel={() => {}}
        userHasUpdatePermission={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
