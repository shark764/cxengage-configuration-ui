---
to: src/containers/SidePanelDetails/<%= name %>/__tests__/index.test.js
---
/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import OutboundIdentifiersSiePanelDetails, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  userHasUpdatePermission
} from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(() => {});
userHasUpdatePermission.mockImplementation(() => true);

describe('OutboundIdentifiersSiePanelDetails Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(
      shallow(
        <OutboundIdentifiersSiePanelDetails store={store}>
          Child
        </OutboundIdentifiersSiePanelDetails>
      )
    ).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});