/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { mockStore } from '../../../utils/testUtils';
import Startup, { mapStateToProps, actions } from '../';

jest.mock('../selectors', () => ({
  hasStarted: () => true
}));

jest.mock('../../../redux/modules/entities/branding/actions');

describe('Startup', () => {
  it('renders', () => {
    shallow(<Startup store={mockStore} />);
  });
});

describe('mapStateToProps', () => {
  it('maps the selectors to the object correctly', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});

describe('actions', () => {
  it('maps the redux actions to the object correctly', () => {
    expect(actions).toMatchSnapshot();
  });
});
