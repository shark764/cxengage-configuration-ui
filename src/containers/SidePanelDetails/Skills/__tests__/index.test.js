/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import SkillsDetailsPanel, { mapStateToProps } from '../';
import {
  getSelectedEntity,
  getCurrentEntity,
  userHasUpdatePermission,
  isInherited,
  isSaving
} from '../../../../redux/modules/entities/selectors';
import { setSelectedSubEntityId, toggleListItemEntity, updateProficiency } from '../../../../redux/modules/entities';
import { getSidePanelTableItems } from '../../../../redux/modules/entities/listItemSelectors';
import { getSkillMemberSidePanelTableItems } from '../../../../redux/modules/entities/skills/selectors';
jest.mock('../../../../redux/store.js', () => jest.fn());
jest.mock('../../../../redux/modules/entities');
jest.mock('../../../../redux/modules/entities/selectors');
jest.mock('../../../../redux/modules/entities/listItemSelectors');
jest.mock('../../../../redux/modules/entities/skills/selectors');
getSelectedEntity.mockImplementation(
  () =>
    new Map({
      id: 'mockId',
      name: 'mockName',
      description: 'mockDescription',
      active: true,
      hasProficiency: true,
      users: [
        {
          id: 'mockSubEntityId'
        }
      ]
    })
);
getCurrentEntity.mockImplementation(() => 'skills');
getSidePanelTableItems.mockImplementation(() => ['mockListMembers']);
getSkillMemberSidePanelTableItems.mockImplementation(() => ['mockListMembers']);
userHasUpdatePermission.mockImplementation(() => true);
isInherited.mockImplementation(() => false);
isSaving.mockImplementation(() => false);
toggleListItemEntity.mockImplementation(() => 'mockId');
setSelectedSubEntityId.mockImplementation(() => 'mockId');
updateProficiency.mockImplementation(() => 'mockId');

describe('SkillsDetailsPanel Renders', () => {
  it('renders', () => {
    const store = createStore(state => state);
    expect(shallow(<SkillsDetailsPanel store={store}>Child</SkillsDetailsPanel>)).toMatchSnapshot();
  });
});

describe('Maps state to props only using selectors', () => {
  it('validates object created from mapStateToProps', () => {
    expect(mapStateToProps()).toMatchSnapshot();
  });
});
