import { Map } from 'immutable';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ExceptionsForm from './layout';
import { setSelectedSubEntityId } from '../../../../redux/modules/entities';
import { isSubEntitySaving } from '../../../../redux/modules/entities/selectors';
import { getCurrentSubFormValueByFieldName } from '../../../../redux/modules/form/selectors';
import { subEntityFormSubmission, exceptionOverlaps } from '../../../../redux/modules/entities/businessHours/selectors';
import { formValidation } from './validation';

const CreateExceptionForm = reduxForm({
  form: 'exception:create',
  onSubmit: subEntityFormSubmission,
  validate: formValidation
})(ExceptionsForm);

export function mapStateToProps(state) {
  return {
    initialValues: new Map({
      isAllDay: true,
      date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      startTimeMinutes: -1,
      endTimeMinutes: -1
    }),
    isSaving: isSubEntitySaving(state),
    key: 'create',
    isAllDay: getCurrentSubFormValueByFieldName(state, 'exception:create', 'isAllDay'),
    exceptionOverlaps: exceptionOverlaps(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateExceptionForm);
