/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from 'serenova-js-utils/strings';
import { validatePhoneNumber, validateSip } from 'serenova-js-utils/validation';
import { selectActiveQueueNames } from '../../../redux/modules/entities/transferLists/selectors';
import store from '../../../redux/store';

const validateEndpoint = (value, type) => {
  if (type === 'selectContactType') {
    return !value && 'Valid Endpoint Required.';
  } else if (type === 'queue') {
    const accurateValue = !value ? value : value.trim();
    return (
      !selectActiveQueueNames(store.getState()).find(queueName => queueName.trim() === accurateValue) &&
      'Valid Queue form the list is required.'
    );
  } else if (type === 'PSTN') {
    return !Boolean(validatePhoneNumber(value)) && 'Valid Phone Number Required';
  } else if (type === 'SIP') {
    return !Boolean(validateSip(value)) && 'Valid SIP Address Required';
  }
};

export const formValidation = (values, props) => {
  if (!props.selectedSubEntityId.includes('updateCategoryHeader')) {
    // While updating the transfer list item, validate all of the fields:
    return {
      hierarchy:
        (values.get('newCategory') && isEmpty(values.get('hierarchy')) && 'Please enter a category name.') ||
        (!values.get('newCategory') && isEmpty(values.get('hierarchy')) && 'Valid Category from the list is Required'),
      name: isEmpty(values.get('name')) && 'Please enter a contact name.',
      contactType:
        (!values.get('contactType') || values.get('contactType') === 'selectContactType') &&
        'Please select a contact type.',
      transferType:
        (!values.get('transferType') || values.get('transferType') === 'selectTransferType') &&
        'Please select a transfer type.',
      warmTransfer: !values.get('warmTransfer') && !values.get('coldTransfer'),
      coldTransfer: !values.get('coldTransfer') && !values.get('warmTransfer'),
      endpoint: validateEndpoint(values.get('endpoint'), values.get('contactType'))
    };
  } else {
    // While updating categoryHeader, just validate the categoryName field:
    return {
      hierarchy: isEmpty(values.get('hierarchy')) && 'Please enter a contact name.'
    };
  }
};
