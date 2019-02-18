/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import TransferListsDetailsPanel from '../layout';

describe('<TransferListsDetailsPanel />', () => {
  it('renders transferLists detailsPanel', () => {
    const rendered = shallow(<TransferListsDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
