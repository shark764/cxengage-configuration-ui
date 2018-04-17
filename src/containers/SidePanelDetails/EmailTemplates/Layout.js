/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';

import EmailTemplatesDetailsPanel from './index';
import EmailTemplatesForm from '../../Form/EmailTemplates';

export default function EmailTemplatesLayout(props) {
  return (
    <EmailTemplatesDetailsPanel>
      <EmailTemplatesForm />
    </EmailTemplatesDetailsPanel>
  );
}
