/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

export const getAllUsersIdMap = state => state.get('UserIdMap');

export const getUserDisplayName = (state, userId) => getAllUsersIdMap(state) && getAllUsersIdMap(state).get(userId);
