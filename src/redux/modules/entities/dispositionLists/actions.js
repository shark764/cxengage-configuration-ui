/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

/*
 *
 * DispositionLists ACTIONS
 *
 */

export const removeDispositionListItem = (type, deleteEntityId) => {
  if (type === 'dispositionListItem') {
    return {
      type: 'REMOVE_DISPOSITION_LIST_ITEM',
      dispositionListItemId: deleteEntityId
    };
  } else if (type === 'categoryItems') {
    return {
      type: 'REMOVE_DISPOSITION_LIST_ITEM',
      categoryId: deleteEntityId
    };
  }
};
