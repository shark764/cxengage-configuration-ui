/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import IdentityProvidersForm from './layout';
import { formValidation } from './validation';
import { getSelectedEntityId, userHasUpdatePermission, isCreating } from '../../../redux/modules/entities/selectors';
import { formSubmission, createFormName, getCurrentFormValueByFieldName } from '../../../redux/modules/form/selectors';
import { entitiesMetaData } from '../../../redux/modules/entities/metaData';
import { injectIntl } from 'react-intl';
import { selectIdentityProvidersFormInitialValues } from '../../../redux/modules/entities/identityProviders/selectors';

const CreateIdentityProvidersForm = compose(
  connect((state) => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true,
  })
)(IdentityProvidersForm);

export const mapStateToProps = (state) => ({
  initialValues: selectIdentityProvidersFormInitialValues(state),
  key: getSelectedEntityId(state),
  handleSubmit: formSubmission,
  isSaving: isCreating(state),
  userHasUpdatePermission: userHasUpdatePermission(state),
  idpType: getCurrentFormValueByFieldName(state, 'identityProviderType'),
  identityProviderTypes: entitiesMetaData.identityProviders.idpConfigInfoTypes,
});

export default injectIntl(connect(mapStateToProps)(CreateIdentityProvidersForm));
