/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import EmailTemplatesForm from './Layout';
import { onFormSubmit } from '../../../redux/modules/entities';
import { validate } from './validation';
import {
  getSelectedEntityId,
  isUpdating
} from '../../../redux/modules/entities/selectors';
import {
  getInitialFormValues,
  getEmailTemplateFormValue,
  getTemplates
} from '../../../redux/modules/entities/emailTemplates/selectors';

/* istanbul ignore next */
let UpdateEmailTemplateForm = compose(
  connect(state => ({ form: `emailTemplates:${getSelectedEntityId(state)}` })),
  reduxForm({
    onSubmit: (values, dispatch, props) =>
      dispatch(onFormSubmit(values, props)),
    validate,
    destroyOnUnmount: false
  })
)(EmailTemplatesForm);

export function mapStateToProps(state) {
  return {
    initialValues: getInitialFormValues(state),
    isSaving: isUpdating(state),
    email: getEmailTemplateFormValue(state),
    templates: getTemplates(state)
  };
}

export default connect(mapStateToProps)(UpdateEmailTemplateForm);
