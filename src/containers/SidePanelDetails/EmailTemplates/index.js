/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import EmailTemplatesDetailsPanel from './Layout';

import { userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import {
  getVariables,
  getInheritedSubject,
  getInheritedBody,
  getTemplateEmail,
  getTemplateShared,
  getTemplateSubject,
  getTemplateBody,
  getEmailTemplateFormValue
} from '../../../redux/modules/entities/emailTemplates/selectors';

export function mapStateToProps(state) {
  return {
    variables: getVariables(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    emailFormValue: getEmailTemplateFormValue(state),
    inheritedSubject: getInheritedSubject(state),
    inheritedBody: getInheritedBody(state),
    templateEmail: getTemplateEmail(state),
    templateShared: getTemplateShared(state),
    templateSubject: getTemplateSubject(state),
    templateBody: getTemplateBody(state)
  };
}

export default connect(mapStateToProps)(EmailTemplatesDetailsPanel);
