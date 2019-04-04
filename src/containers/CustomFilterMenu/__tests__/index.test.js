/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import CustomFilterMenu, { mapStateToProps } from '../';
import { mockStore } from '../../../utils/testUtils';
jest.mock('../../../redux/modules/columnFilterMenus/selectors');

describe('CustomFilterMenu Renders', () => {
  it('renders', () => {
    const rendered = shallow(
      <CustomFilterMenu
        store={mockStore}
        menuType="mockMenu"
        tableType="mockTable"
        buttonType=""
        currentFilter=""
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
