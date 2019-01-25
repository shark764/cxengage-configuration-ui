---
to: src/containers/Form/<%= Name %>/index.js
---
/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import <%= Name %>Form from './layout';
import { onFormSubmit } from '../../../redux/modules/entities';
import { formValidation } from './validation';
import { getSelectedEntityId, isInherited, isCreating, userHasUpdatePermission } from '../../../redux/modules/entities/selectors';
import { selectFormInitialValues, formSubmission, createFormName } from '../../../redux/modules/form/selectors';

const Create<%= Name %>Form = compose(
  connect((state) => createFormName(state)),
  reduxForm({
    onSubmit: formSubmission,
    validate: formValidation,
    destroyOnUnmount: true
  })
)(<%= Name %>Form);

export function mapStateToProps(state) {
  return {
    initialValues: selectFormInitialValues(state),
    isSaving: isCreating(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    key: getSelectedEntityId(state)
  };
}

export default connect(mapStateToProps)(Create<%= Name %>Form);
