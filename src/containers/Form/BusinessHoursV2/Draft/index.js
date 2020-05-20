import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import BusinessHoursV2DraftForm from './layout';

import { setSelectedSubEntityId } from '../../../../redux/modules/entities';
import { isSubEntitySaving, isInherited, userHasUpdatePermission } from '../../../../redux/modules/entities/selectors';
import { getTimezones } from '../../../../redux/modules/timezones/selectors';
import {
  isPublishingDraft,
  subEntityFormSubmission,
  selectBusinessHoursV2DraftFormInitalValues
} from '../../../../redux/modules/entities/businessHoursV2/selectors';
import { formValidation } from './validation';

const DraftForm = reduxForm({
  form: 'draft:edit',
  onSubmit: subEntityFormSubmission,
  validate: formValidation,
  enableReinitialize: true
})(BusinessHoursV2DraftForm);

export function mapStateToProps(state) {
  return {
    initialValues: selectBusinessHoursV2DraftFormInitalValues(state),
    isSaving: isSubEntitySaving(state),
    key: 'edit',
    timezones: getTimezones(state),
    inherited: isInherited(state),
    userHasUpdatePermission: userHasUpdatePermission(state),
    isPublishing: isPublishingDraft(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftForm);
