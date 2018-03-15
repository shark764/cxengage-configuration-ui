/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { ListItemsForm } from 'cx-ui-components';
import {
  setSelectedSubEntityId,
  onSubEntityFormSubmit,
  getSelectedEntity,
  getCurrentEntityStore
} from '../../../redux/modules/crudEndpoint';
import validate from './validation';

let CreateListItemsForm = reduxForm({
  form: 'listItems:create',
  onSubmit: (values, dispatch, props) =>
    dispatch(onSubEntityFormSubmit(values, props)),
  validate
})(ListItemsForm);

function mapStateToProps(state) {
  const selectedList = getSelectedEntity(state);
  return {
    listName: selectedList.get('name'),
    fieldItems: selectedList.getIn(['listType', 'fields']).toJS(),
    isSaving: getCurrentEntityStore(state).get('subEntitySaving')
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
