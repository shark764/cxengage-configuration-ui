/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { ListItemsForm } from 'cx-ui-components';
import {
  setSelectedSubEntityId,
  onSubEntityFormSubmit
} from '../../../redux/modules/crudEndpoint';
import {
  getSelectedEntityName,
  isSubEntitySaving
} from '../../../redux/modules/crudEndpoint/selectors';
import { getFieldItems } from './selectors';
import validate from './validation';

let CreateListItemsForm = reduxForm({
  form: 'listItems:create',
  onSubmit: (values, dispatch, props) =>
    dispatch(onSubEntityFormSubmit(values, props)),
  validate
})(ListItemsForm);

function mapStateToProps(state) {
  return {
    listName: getSelectedEntityName(state),
    fieldItems: getFieldItems(state),
    isSaving: isSubEntitySaving(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateListItemsForm
);
