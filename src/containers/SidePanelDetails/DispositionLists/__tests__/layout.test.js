/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DispositionListsDetailsPanel from '../layout';

describe('<DispositionListsDetailsPanel />', () => {
  it('renders dispositionLists detailsPanel', () => {
    const rendered = shallow(<DispositionListsDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
