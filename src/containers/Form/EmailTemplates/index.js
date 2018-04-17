/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { EmailTemplatesForm } from 'cx-ui-components';
import { onFormSubmit } from '../../../redux/modules/crudEndpoint';
import { validate } from './validation';
import {
  getSelectedEntityId,
  getSelectedEntity
} from '../../../redux/modules/crudEndpoint/selectors';

let UpdateEmailTemplateForm = compose(
  connect(state => ({ form: `emailTemplates:${getSelectedEntityId(state)}` })),
  reduxForm({
    onSubmit: (values, dispatch, props) =>
      dispatch(onFormSubmit(values, props)),
    validate,
    destroyOnUnmount: false
  })
)(EmailTemplatesForm);

function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);
  if (selectedEntity) {
    let initialValues;
    if (
      selectedEntity.getIn(['template', 'tenantId']) ===
      selectedEntity.getIn(['inherited', 'tenantId'])
    ) {
      initialValues = {
        email: 'default',
        shared: false,
        subject: selectedEntity.getIn(['inherited', 'subject']),
        body: selectedEntity.getIn(['inherited', 'body'])
      };
    } else {
      initialValues = {
        email: 'custom',
        shared: selectedEntity.getIn(['template', 'shared']),
        subject: selectedEntity.getIn(['template', 'subject']),
        body: selectedEntity.getIn(['template', 'body'])
      };
    }
    return {
      initialValues: new Map(initialValues),
      isSaving: selectedEntity.get('updating') === true,
      email: state.getIn([
        'form',
        `emailTemplates:${getSelectedEntityId(state)}`,
        'values',
        'email'
      ]),
      templates: selectedEntity
        .get('variables')
        .map(variable => variable.get('name'))
        .toJS()
    };
  }
  return {};
}

export default connect(mapStateToProps)(UpdateEmailTemplateForm);
