/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { formValidation } from './validation';
import MessageTemplatesForm from './layout';
import { createFormName, formSubmission, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { getSelectedEntityId, isCreating, userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import {
  messageTemplateFormInitialValues,
  isDisplayContentInHtml
} from '../../../redux/modules/entities/messageTemplates/selectors';
import { toggleMessageTemplateText } from '../../../redux/modules/entities/index';

const CreateMessageTemplatesForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation
  })
)(MessageTemplatesForm);

export const mapStateToProps = state => ({
  key: getSelectedEntityId(state),
  isSaving: isCreating(state),
  selectedEntityId: getSelectedEntityId(state),
  initialValues: messageTemplateFormInitialValues(state),
  userHasUpdatePermission: userHasUpdatePermission(state),
  channels: getCurrentFormValueByFieldName(state, 'channels'),
  templateText: getCurrentFormValueByFieldName(state, 'template'),
  templateTextType: getCurrentFormValueByFieldName(state, 'templateTextType'),
  isDisplayContentInHtml: isDisplayContentInHtml(state)
});

export const mapDispatchToProps = dispatch => ({
  toggleMessageTemplateText: isDisplayContentInHtml => dispatch(toggleMessageTemplateText(isDisplayContentInHtml))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageTemplatesForm);
