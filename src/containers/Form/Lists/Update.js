/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { ListsForm } from 'cx-ui-components';
import { updateFormValidation } from './validation';
import { onFormSubmit } from '../../../redux/modules/crudEndpoint';
import {
  getSelectedEntityId,
  getSelectedEntity,
  isInherited,
  getSelectedEntity
} from '../../../redux/modules/crudEndpoint/selectors';

let UpdateListForm = compose(
  connect(state => ({ form: `lists:${getSelectedEntityId(state)}` })),
  reduxForm({
    onSubmit: (values, dispatch, props) =>
      dispatch(onFormSubmit(values, props)),
    validate: updateFormValidation,
    destroyOnUnmount: false
  })
)(ListsForm);

function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);
  if (selectedEntity) {
    return {
      update: true,
      initialValues: new Map({
        name: selectedEntity.get('name')
      }),
      listType: selectedEntity.getIn(['listType', 'name']),
      isSaving: selectedEntity.get('updating') === true,
      inherited: isInherited(state)
    };
  }
  return {};
}

export default connect(mapStateToProps)(UpdateListForm);
