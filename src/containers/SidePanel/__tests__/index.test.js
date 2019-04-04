/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../utils/testUtils';
import SidePanelLayout, { mapStateToProps } from '../';

jest.mock('../../../redux/modules/entities/selectors', () => ({
  getSidePanelWidth: () => 50,
  userHasCurrentFormPermission: () => true
}));

describe('SidePanelLayout Renders', () => {
  it('renders', () => {
    const rendered = shallow(
      <SidePanelLayout store={mockStore} menuType="mockMenu" tableType="mockTable" selectionType="checkbox" />
    );
    expect(rendered).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
