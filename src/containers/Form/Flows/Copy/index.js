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
  getSelectedSubEntityId
} from '../../../../redux/modules/entities/selectors';
import {
  selectFlowNames,
  subEntityFormSubmission,
  getNewItemName
} from '../../../../redux/modules/entities/flows/selectors';
import validate from './validation';

const CreateCopyFlowForm = reduxForm({
  form: 'copyFlow:create',
  onSubmit: subEntityFormSubmission,
  validate
})(CopyFlowForm);

export function mapStateToProps(state) {
  return {
    initialValues: new Map({
      name: getNewItemName(state),
      description: getSelectedEntity(state).get('description')
    }),
    isSaving: isSubEntitySaving(state),
    subEntityId: getSelectedSubEntityId(state),
    flowName: getSelectedEntity(state).get('name'),
    names: selectFlowNames(state),
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
