/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { ListsForm } from 'cx-ui-components';
import { onFormSubmit } from '../../../redux/modules/entities';
import { updateFormValidation } from './validation';
import {
  getSelectedEntityId,
  isInherited,
  isUpdating
} from '../../../redux/modules/entities/selectors';
import {
  getListTypeName,
  getInitialUpdateFormValues
} from '../../../redux/modules/entities/lists/selectors';

/* istanbul ignore next */
let UpdateListForm = compose(
  connect(state => ({ form: `lists:${getSelectedEntityId(state)}` })),
  reduxForm({
    onSubmit: (values, dispatch, props) =>
      dispatch(onFormSubmit(values, props)),
    validate: updateFormValidation,
    destroyOnUnmount: false
  })
)(ListsForm);

export function mapStateToProps(state) {
  return {
    update: true,
    initialValues: getInitialUpdateFormValues(state),
    listType: getListTypeName(state),
    isSaving: isUpdating(state),
    inherited: isInherited(state)
  };
}

export default connect(mapStateToProps)(UpdateListForm);
