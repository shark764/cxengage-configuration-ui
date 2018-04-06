/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { Map } from 'immutable';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { ListsForm } from 'cx-ui-components';
import { onFormSubmit } from '../../../redux/modules/crudEndpoint';
import validate from '../ListItems/validation';
import {
  getSelectedEntityId,
  isCreating
} from '../../../redux/modules/crudEndpoint/selectors';

let CreateListForm = reduxForm({
  form: 'lists:create',
  onSubmit: (values, dispatch, props) => dispatch(onFormSubmit(values, props)),
  validate
})(ListsForm);

function mapStateToProps(state) {
  const selectedEntityId = getSelectedEntityId(state);
  if (selectedEntityId === 'create') {
    let listTypes = state.getIn(['crudEndpoint', 'listTypes', 'data']);
    if (listTypes) {
      listTypes = listTypes
        .toJS()
        .filter(listType => listType.active)
        .map(listType => ({ value: listType.id, label: listType.name }));
    }
    return {
      listTypes,
      initialValues: new Map({
        active: true
      }),
      fieldItems: [
        {
          name: 'name',
          label: 'Name',
          type: 'input',
          required: true,
          isSaving: isCreating(state)
        },
        {
          name: 'listTypeId',
          label: 'List Type',
          type: 'select',
          required: true,
          isSaving: isCreating(state),
          options: listTypes
        }
      ],
      isSaving: isCreating(state)
    };
  }
  return {};
}

export default connect(mapStateToProps)(CreateListForm);