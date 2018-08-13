/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { isEmpty } from '../../../utils/string';

export const formValidation = values => ({
  name: isEmpty(values.get('name')) && 'Please enter a name',
  value: isEmpty(values.get('value')) && 'Please enter a value',
  flowId: !values.get('flowId') && 'Please select a flow',
  channelType: !values.get('channelType') && 'Please select a channel type'
});
