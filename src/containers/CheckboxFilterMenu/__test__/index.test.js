/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import CheckboxFilterMenu, { mapStateToProps, actions } from '../';
import { mockStore } from 'TestUtils';

jest.mock('../../../redux/modules/columnFilterMenus/selectors');

describe('CheckboxFilterMenu Renders', () => {
  it('renders', () => {
    const rendered = shallow(
      <CheckboxFilterMenu
        store={mockStore}
        menuType="mockMenu"
        tableType="mockTable"
        selectionType="checkbox"
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('Actions', () => {
  it('map properly', () => {
    expect(actions).toMatchSnapshot();
  });
});
