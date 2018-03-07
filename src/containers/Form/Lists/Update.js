/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { ListsForm } from 'cx-ui-components';
import { updateFormValidation } from './validation';
import {
  onFormSubmit,
  getSelectedEntityId,
  getSelectedEntity
} from '../../../redux/modules/crudEndpoint';

let UpdateListForm = compose(
  connect(state => ({ form: `lists:${getSelectedEntityId(state)}` })),
  reduxForm({
    onSubmit: (values, dispatch, props) =>
      dispatch(onFormSubmit(values, props)),
    validate: updateFormValidation
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
      isSaving: selectedEntity.get('updating') === true
    };
  }
  return {};
}

export default connect(mapStateToProps)(UpdateListForm);
