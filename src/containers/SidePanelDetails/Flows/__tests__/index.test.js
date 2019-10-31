/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import FlowsDetailsPanel from '../';
import {
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  isSaving
} from '../../../../redux/modules/entities/selectors';
import { selectFlowItems } from '../../../../redux/modules/entities/flows/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(() => new Map({ id: 'mockId', name: 'mockName', type: 'mockType' }));
userHasUpdatePermission.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
isSaving.mockImplementation(() => false);

jest.mock('../../../../redux/modules/entities/flows/selectors');
selectFlowItems.mockImplementation(() => [{ id: '0001', name: 'mockName1' }, { id: '0002', name: 'mockName2' }]);

describe('FlowsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<FlowsDetailsPanel store={store}>Child</FlowsDetailsPanel>)).toMatchSnapshot();
  });
});
