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
    return {
      variables: selectedEntity.get('variables').toJS(),
      userHasUpdatePermission: userHasUpdatePermission(state),
      email: state.getIn([
        'form',
        `emailTemplates:${getSelectedEntityId(state)}`,
        'values',
        'email'
      ]),
      inheritedSubject: selectedEntity.getIn(['inherited', 'subject']),
      inheritedBody: selectedEntity.getIn(['inherited', 'body'])
    };
  }
  return {};
}

export default connect(mapStateToProps)(EmailTemplatesDetailsPanel);
