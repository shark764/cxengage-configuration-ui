/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DispositionsDetailsPanel from '../layout';

describe('<DispositionsDetailsPanel />', () => {
  it('renders dispositions detailsPanel', () => {
    const rendered = shallow(<DispositionsDetailsPanel className="details-panel" children={'Mock Child'} />);
    expect(rendered).toMatchSnapshot();
  });
});
