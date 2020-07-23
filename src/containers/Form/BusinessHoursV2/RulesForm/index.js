import { connect } from 'react-redux';
import { isValid, isDirty, reduxForm } from 'redux-form/immutable';
import BusinessHoursV2RulesForm from './layout';
import { subEntityFormSubmission } from '../../../../redux/modules/form/selectors';
import { userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { formValidation } from './validation';

import {
  selectBusinessHoursV2RulesFormInitalValues,
  selectRulesFormDisabled,
  selectRulesFormViewMode
} from '../../../../redux/modules/entities/businessHoursV2/selectors';

const RulesForm = reduxForm({
  form: 'businessHoursV2:rules',
  onSubmit: subEntityFormSubmission,
  validate: formValidation,
  enableReinitialize: true,
  destroyOnUnmount: false
})(BusinessHoursV2RulesForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectBusinessHoursV2RulesFormInitalValues(state),
    disabled: selectRulesFormDisabled(state),
    viewOnly: selectRulesFormViewMode(state),
    draftFormCanSave: isValid('draft:edit')(state) && isDirty('draft:edit')(state),
    userHasUpdatePermission: userHasUpdatePermission(state)
  };
}

export default connect(mapStateToProps)(RulesForm);
