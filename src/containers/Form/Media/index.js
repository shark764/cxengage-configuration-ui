/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import MediaForm from './layout';
import { formValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isCreating,
  userHasUpdatePermission,
} from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { selectMediaFormInitialValues, selectMedias } from '../../../redux/modules/entities/media/selectors';

const CreateMediaForm = compose(
  connect((state) => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true,
  })
)(MediaForm);

export const mapStateToProps = (state) => ({
  initialValues: selectMediaFormInitialValues(state),
  isSaving: isCreating(state),
  inherited: isInherited(state),
  userHasUpdatePermission: userHasUpdatePermission(state),
  key: getSelectedEntityId(state),
  mediaType: getCurrentFormValueByFieldName(state, 'type'),
  medias: selectMedias(state),
  selectedEntityId: getSelectedEntityId(state),
});

export default connect(mapStateToProps)(CreateMediaForm);
