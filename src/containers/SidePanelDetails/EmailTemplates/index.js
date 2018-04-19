/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';

import { EmailTemplatesDetailsPanel } from 'cx-ui-components';

import {
  getSelectedEntity,
  getSelectedEntityId,
  userHasUpdatePermission
} from '../../../redux/modules/crudEndpoint/selectors';

function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);

  if (selectedEntity) {
    const inheritedTemplate = selectedEntity.get('inherited');
    const template = selectedEntity.get('template');
    return {
      variables: selectedEntity.get('variables').toJS(),
      userHasUpdatePermission: userHasUpdatePermission(state),
      emailFormValue: state.getIn([
        'form',
        `emailTemplates:${getSelectedEntityId(state)}`,
        'values',
        'email'
      ]),
      inheritedSubject: inheritedTemplate.get('subject'),
      inheritedBody: inheritedTemplate.get('body'),
      templateEmail:
        template.get('tenantId') === inheritedTemplate.get('tenantId')
          ? 'Default'
          : 'Custom',
      templateShared: template.get('shared') ? 'Yes' : 'No',
      templateSubject: template.get('subject'),
      templateBody: template.get('body')
    };
  }
  return {};
}

export default connect(mapStateToProps)(EmailTemplatesDetailsPanel);
