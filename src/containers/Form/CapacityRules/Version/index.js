import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl } from 'react-intl';

import VersionForm from './layout';
import { setSelectedSubEntityId } from '../../../../redux/modules/entities';
import { isSubEntitySaving, getSelectedSubEntityId } from '../../../../redux/modules/entities/selectors';
import { subEntityFormSubmission } from '../../../../redux/modules/form/selectors';
import { selectCapacityRuleVersionFormInitialValues } from '../../../../redux/modules/entities/capacityRules/selectors';
import { formValidation } from './validation';

const CreateVersionForm = reduxForm({
  form: 'version:create',
  onSubmit: subEntityFormSubmission,
  validate: formValidation,
  touchOnChange: true,
})(VersionForm);

export function mapStateToProps(state) {
  return {
    isSaving: isSubEntitySaving(state),
    key: 'create',
    disabled: getSelectedSubEntityId(state) !== 'create',
    initialValues: selectCapacityRuleVersionFormInitialValues(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    },
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CreateVersionForm));
