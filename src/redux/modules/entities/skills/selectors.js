/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { getSelectedEntityId } from '../selectors';
import { getDependantEntityTableItems } from '../listItemSelectors';
import { getCurrentForm } from '../../form/selectors';

export const getHasProficiencyFormValue = state =>
  getCurrentForm(state) && getCurrentForm(state).getIn(['values', 'hasProficiency']);

export const getSkillMemberSidePanelTableItems = state => {
  const selectedEntityId = getSelectedEntityId(state);
  return getDependantEntityTableItems(state).map(user => ({
    ...user,
    firstName: user.firstName !== null ? user.firstName : '',
    lastName: user.lastName !== null ? user.lastName : '',
    proficiency: user.skills.filter(skill => selectedEntityId === skill.id).map(skill => skill.proficiency)[0]
  }));
};
