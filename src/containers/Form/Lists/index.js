/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { ListsForm as ListsFormComponent } from 'cx-ui-components';
import {
  getSelectedEntity,
  onFormSubmit
} from '../../../redux/modules/crudEndpoint';

let ListsForm;

ListsForm = reduxForm({
  form: 'lists',
  onSubmit: (values, dispatch, props) => dispatch(onFormSubmit(values, props)),
  validate: values => {
    const errors = {};
    if (!values.get('name')) {
      errors.name = 'Please enter a name';
    }
    return errors;
  }
})(ListsFormComponent);

function mapStateToProps(state) {
  const selectedEntity = getSelectedEntity(state);

  if (selectedEntity) {
    return {
      update: true,
      initialValues: new Map({
        name: selectedEntity.get('name')
      }),
      listType: selectedEntity.getIn(['listType', 'name'])
    };
  }
  return {};
}

export default connect(mapStateToProps)(ListsForm);
