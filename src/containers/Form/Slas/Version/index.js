/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import InitialVersionLayout from './layout';
import { setSelectedSubEntityId } from '../../../../redux/modules/entities';
import { isSubEntitySaving, getSelectedSubEntityId } from '../../../../redux/modules/entities/selectors';
import {
  subEntityFormSubmission,
  selectSlaVersionFormInitialValues
} from '../../../../redux/modules/entities/slas/selectors';
import { getCurrentSubFormValueByFieldName } from '../../../../redux/modules/form/selectors';
import { formValidation } from './validation';

const CreateInitialVersionForm = reduxForm({
  form: 'initialSlaVersion:create',
  onSubmit: subEntityFormSubmission,
  validate: formValidation
})(InitialVersionLayout);

export function mapStateToProps(state) {
  return {
    initialValues: selectSlaVersionFormInitialValues(state),
    isSaving: isSubEntitySaving(state),
    slaAbandonType: getCurrentSubFormValueByFieldName(
      state,
      'initialSlaVersion:create',
      'initialVersion',
      'abandonType'
    ),
    viewOnly: getSelectedSubEntityId(state) !== 'versions',
    key: 'create'
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInitialVersionForm);
