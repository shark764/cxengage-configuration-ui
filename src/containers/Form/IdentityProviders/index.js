/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import IdentityProvidersForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, userHasUpdatePermission, isCreating } from '../../../redux/modules/entities/selectors';
import {
  selectFormInitialValues,
  formSubmission,
  createFormName,
  getCurrentFormValueByFieldName,
} from '../../../redux/modules/form/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';

const CreateIdentityProvidersForm = compose(
  connect((state) => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true,
  })
)(IdentityProvidersForm);

export const mapStateToProps = (state) => ({
  initialValues: selectFormInitialValues(state),
  key: getSelectedEntityId(state),
  handleSubmit: formSubmission,
  isSaving: isCreating(state),
  userHasUpdatePermission: userHasUpdatePermission(state),
  idpType: getCurrentFormValueByFieldName(state, 'identityProviderType'),
  identityProviderTypes: entitiesMetaData.identityProviders.idpConfigInfoTypes,
  metadataFile: '',
});

export default connect(mapStateToProps)(CreateIdentityProvidersForm);
