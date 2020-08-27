/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import ContactLayoutsListItemsForm from '../layout';

describe('<ContactLayoutsListItemsForm />', () => {
  it('renders create new category form', () => {
    const rendered = shallow(
      <ContactLayoutsListItemsForm
        invalid={false}
        isSaving={false}
        pristine={false}
        inherited={false}
        onCancel={() => {}}
        handleSubmit={() => {}}
        selectedSubEntityId="create"
        userHasUpdatePermission={true}
        contactLayoutName="mockContactLayoutName"
        availableContactAttributesNames={['mockAttribute1']}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders create List Item form', () => {
    const rendered = shallow(
      <ContactLayoutsListItemsForm
        invalid={false}
        isSaving={false}
        pristine={false}
        inherited={false}
        onCancel={() => {}}
        handleSubmit={() => {}}
        selectedSubEntityId="createListItem:"
        userHasUpdatePermission={true}
        contactLayoutName="mockContactLayoutName"
        availableContactAttributesNames={['mockAttribute1']}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update category name form', () => {
    const rendered = shallow(
      <ContactLayoutsListItemsForm
        invalid={false}
        isSaving={false}
        pristine={false}
        inherited={false}
        onCancel={() => {}}
        handleSubmit={() => {}}
        selectedSubEntityId="updateCategoryName:mockId"
        userHasUpdatePermission={true}
        contactLayoutName="mockContactLayoutName"
        availableContactAttributesNames={['mockAttribute1']}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
