/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { getSelectedEntityId } from '../selectors';
import { getDependantEntityTableItems } from '../listItemSelectors';
import { getCurrentForm } from '../../form/selectors';
import { getDisplay } from '../users/selectors';

export const getHasProficiencyFormValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'hasProficiency']);

export const getSkillMemberSidePanelTableItems = state =>
  getSkillMembers(getSelectedEntityId(state), getDependantEntityTableItems(state));

export const getSkillMembers = (selectedEntityId, dependantEntityTableItems) => {
  return dependantEntityTableItems.map(user => ({
    ...user,
    name: getDisplay(user),
    proficiency: user.skills.find(skill => selectedEntityId === skill.id).proficiency
  }));
};
