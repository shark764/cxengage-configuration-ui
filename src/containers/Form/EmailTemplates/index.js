/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { EmailTemplatesForm } from 'cx-ui-components';
import { onFormSubmit } from '../../../redux/modules/crudEndpoint';
import { validate } from './validation';
import {
  getSelectedEntityId,
  isUpdating,
} from '../../../redux/modules/crudEndpoint/selectors';
import {
  getEmailTemplateFormValue,
} from '../../../redux/modules/emailTemplates/selectors';
import {
  getInitialValues,
  getTemplates,
} from './selectors';

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
    initialValues: getInitialValues(state),
    isSaving: isUpdating(state),
    email: getEmailTemplateFormValue(state),
    templates: getTemplates(state),
  };
}

export default connect(mapStateToProps)(UpdateEmailTemplateForm);
