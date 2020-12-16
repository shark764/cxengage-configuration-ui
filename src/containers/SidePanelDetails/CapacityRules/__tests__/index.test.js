/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import CapacityRulesDetailsPanel from '../';
import {
  getSelectedEntity,
  userHasUpdatePermission,
  isInherited,
  isSaving,
} from '../../../../redux/modules/entities/selectors';

jest.mock('../../../../redux/modules/entities/selectors');
getSelectedEntity.mockImplementation(
  () =>
    new Map({
      id: 'mockId',
      name: 'mockName',
      type: 'mockType',
    })
);
userHasUpdatePermission.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
isSaving.mockImplementation(() => false);

describe('CapacityRulesDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore((state) => state);
    expect(shallow(<CapacityRulesDetailsPanel store={store}>Child</CapacityRulesDetailsPanel>)).toMatchSnapshot();
  });
});
