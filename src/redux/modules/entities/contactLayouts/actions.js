/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

export const removeContactLayoutsListItem = (type, deleteEntityId) => {
  if (type === 'contactLayoutsListItem') {
    return {
      type: 'REMOVE_CONTACT_LAYOUTS_LIST_ITEM',
      contactLayoutsListItemId: deleteEntityId
    };
  } else if (type === 'categoryItems') {
    return {
      type: 'REMOVE_CONTACT_LAYOUTS_LIST_ITEM',
      categoryId: deleteEntityId
    };
  }
};
