/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import ListItemsForm from './Layout';
import {
  setSelectedSubEntityId,
  onSubEntityFormSubmit
} from '../../../redux/modules/entities';
import {
  getSelectedEntityName,
  isSubEntitySaving
} from '../../../redux/modules/entities/selectors';
import { getFieldItems } from './selectors';
import validate from './validation';

const CreateListItemsForm = reduxForm({
  form: 'listItems:create',
  onSubmit: (values, dispatch, props) =>
    dispatch(onSubEntityFormSubmit(values, props)),
  validate
})(ListItemsForm);

export function mapStateToProps(state) {
  return {
    listName: getSelectedEntityName(state),
    fieldItems: getFieldItems(state),
    isSaving: isSubEntitySaving(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onCancel: () => {
      dispatch(setSelectedSubEntityId(undefined));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateListItemsForm
);
