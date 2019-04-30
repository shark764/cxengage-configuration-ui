/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import CopyFlowForm from './layout';
import { setSelectedSubEntityId } from '../../../../redux/modules/entities';
import {
  getSelectedEntity,
  isSubEntitySaving,
  getSelectedSubEntityId,
  getSelectedSubEntityName
} from '../../../../redux/modules/entities/selectors';
import {
  selectFlowNames,
  selectFlowDraftNames,
  subEntityFormSubmission
} from '../../../../redux/modules/entities/flows/selectors';
import { formValidation } from './validation';

const CreateCopyFlowForm = reduxForm({
  form: 'copyFlow:create',
  onSubmit: subEntityFormSubmission,
  validate: formValidation
})(CopyFlowForm);

export function mapStateToProps(state) {
  return {
    initialValues: new Map({
      description: getSelectedEntity(state).get('description')
    }),
    isSaving: isSubEntitySaving(state),
    subEntityId: getSelectedSubEntityId(state),
    subEntityName: getSelectedSubEntityName(state),
    flowName: getSelectedEntity(state).get('name'),
    names: selectFlowNames(state),
    drafts: selectFlowDraftNames(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateCopyFlowForm);
