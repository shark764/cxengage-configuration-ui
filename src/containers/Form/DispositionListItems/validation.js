/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

export const formValidation = (values, props) => {
  if (!props.selectedSubEntityId.includes('updateCategoryHeader')) {
    // While updating the transfer list item, validate all of the fields:
    return {
      hierarchy:
        (values.get('newCategory') &&
          !values.get('isUncategorized') &&
          isEmpty(values.get('hierarchy')) &&
          'Please enter a category name.') ||
        (!values.get('newCategory') &&
          !values.get('isUncategorized') &&
          isEmpty(values.get('hierarchy')) &&
          'Valid Category from the list is Required'),
      disposition:
        (!values.get('disposition') || values.get('disposition') === 'selectDisposition') &&
        'Please select a disposition.'
    };
  } else {
    // While updating categoryHeader, just validate the categoryName field:
    return {
      hierarchy: isEmpty(!values.get('isUncategorized') && values.get('hierarchy')) && 'Please enter a contact name.'
    };
  }
};
