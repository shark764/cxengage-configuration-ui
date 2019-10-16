/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import ReasonsBulkActionsFormLayout from './layout';
import { isCreating, getCurrentEntity } from '../../../../redux/modules/entities/selectors';
import { formSubmission, getCurrentFormValueByFieldName } from '../../../../redux/modules/form/selectors';

export const createFormName = state => ({ form: `${getCurrentEntity(state)}:bulk` });

const ReasonsBulkActionsForm = compose(
  connect(createFormName),
  reduxForm({
    onSubmit: formSubmission,
    destroyOnUnmount: true
  })
)(ReasonsBulkActionsFormLayout);

export function mapStateToProps(state) {
  return {
    entityName: getCurrentEntity(state),
    initialValues: new Map({ shared: false }),
    // "shared" is managed by Redux, so we cannot
    // access its value from local state
    // This is due to, unlike "active", sharing a
    // reasons required to enable Submit button if
    // the toggle changes.
    sharedIsChecked: getCurrentFormValueByFieldName(state, 'shared'),
    isSaving: isCreating(state),
    key: `${getCurrentEntity(state)}:bulk`
  };
}

export default connect(mapStateToProps)(ReasonsBulkActionsForm);