/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import TransferListsForm from '../layout';
import { List } from 'immutable';

describe('<TransferListsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <TransferListsForm
        name="mockName"
        entityName="transferLists"
        isSaving={false}
        handleSubmit={() => {}}
        endpointHeaders={List([{ a: 'mockEndpointheaders' }])}
        selectedEntityId="mockEntitiyId"
        userHasUpdatePermission={true}
        removeCategoryItems={() => {}}
        removeTransferListItem={() => {}}
        setSelectedSubEntityId={() => {}}
        allowUpdateCategory={true}
        allowUpdateItem={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <TransferListsForm
        name="mockName"
        entityName="transferLists"
        isSaving={false}
        handleSubmit={() => {}}
        endpointHeaders={List([{ a: 'mockEndpointheaders' }])}
        selectedEntityId="mockEntitiyId"
        userHasUpdatePermission={true}
        removeCategoryItems={() => {}}
        removeTransferListItem={() => {}}
        setSelectedSubEntityId={() => {}}
        allowUpdateCategory={true}
        allowUpdateItem={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
