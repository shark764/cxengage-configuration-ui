/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { getSelectedEntity } from '../selectors';
import { getDependantEntityTableItems } from '../listItemSelectors';
import { getDisplay } from '../users/selectors';
import { List } from 'immutable';
import { createSelector } from 'reselect';

export const getSkillsData = state => state.getIn(['Entities', 'skills', 'data'], new List([]));

export const selectSkills = createSelector([getSkillsData], skills => {
  const skillsArray = skills
    .filter(skill => skill.get('active'))
    .map(skill => ({ value: skill.get('id'), label: skill.get('name') }))
    .toJS();
  return skillsArray;
});

export const getSkillMemberSidePanelTableItems = state =>
  getSkillMembers(getSelectedEntity(state), getDependantEntityTableItems(state));

export const getSkillMembers = (selectedEntity, dependantEntityTableItems) => {
  return dependantEntityTableItems.map(user => ({
    ...user,
    name: getDisplay(user),
    proficiency: user.skills.find(skill => selectedEntity.get('id') === skill.id).proficiency,
    hasProficiency: selectedEntity.get('hasProficiency')
  }));
};
