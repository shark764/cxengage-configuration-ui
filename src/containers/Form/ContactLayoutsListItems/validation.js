/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';

const hierarchyFieldValidation = (values, props) => {
  if (isEmpty(values.get('hierarchy'))) {
    return 'Category Name is required.';
  } else {
    if (props.selectedSubEntityId === 'create') {
      const doesCategoryAlreadyExists =
        props.existingCategories &&
        props.existingCategories.find(a => a.get('hierarchy') === values.get('hierarchy').trim());
      return doesCategoryAlreadyExists && 'Category with the same name already exists, please use a different name.';
    } else {
      const availableCategories =
        props.existingCategories &&
        props.existingCategories.filter(
          category =>
            category.get('categoryUUID') === values.get('categoryUUID')
              ? category.get('hierarchy') !== values.get('hierarchy').trim()
              : true
        );
      const doesCategoryAlreadyExists =
        availableCategories && availableCategories.find(a => a.get('hierarchy') === values.get('hierarchy').trim());
      return doesCategoryAlreadyExists && 'Category with the same name already exists, please use a different name.';
    }
  }
};

const contactAttributeFieldValiation = (value, contactAttributesNames) => {
  if (isEmpty(value)) {
    return 'Contact Attribute is required';
  } else if (contactAttributesNames && !contactAttributesNames.includes(value)) {
    return 'Valid Attribute from the list is required.';
  }
};

export const formValidation = (values, props) => {
  return {
    hierarchy: hierarchyFieldValidation(values, props),
    name: contactAttributeFieldValiation(values.get('name'), props.availableContactAttributesNames)
  };
};
