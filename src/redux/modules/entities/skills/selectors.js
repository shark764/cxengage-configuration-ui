/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { getSelectedEntity } from '../selectors';
import { getDependantEntityTableItems } from '../listItemSelectors';
import { getDisplay } from '../users/selectors';

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
