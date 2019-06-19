/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import EmailTemplatesForm from './layout';
import { validate } from './validation';
import { getSelectedEntityId, isUpdating } from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { getInitialFormValues, getTemplates } from '../../../redux/modules/entities/emailTemplates/selectors';

const UpdateEmailTemplateForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate,
    destroyOnUnmount: true
  })
)(EmailTemplatesForm);

export function mapStateToProps(state) {
  return {
    initialValues: getInitialFormValues(state),
    isSaving: isUpdating(state),
    email: getCurrentFormValueByFieldName(state, 'email'),
    templates: getTemplates(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(UpdateEmailTemplateForm);
