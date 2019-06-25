/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import TransferListItemsForm from '../layout';

describe('<TransferListItemsForm>', () => {
  it('renders create transfer list items form', () => {
    const render = shallow(
      <TransferListItemsForm
        isSaving={false}
        transferListName="mockTransferListName"
        selectedEntityId="mockTransferListId"
        selectedContactType="queue"
        selectedSubEntityId="create"
        existingCategories={['category1', 'category2']}
        selectActiveQueueNames={['queue1', 'queue2']}
        hierarchyInputText=""
        endpointFieldValue=""
        isUserCreatingNewCategory={true}
        onCancel={() => {}}
        handleSubmit={() => {}}
        change={() => {}}
        clearFields={() => {}}
      />
    );
    expect(render).toMatchSnapshot();
  });
  it('renders update transfer list items form', () => {
    const render = shallow(
      <TransferListItemsForm
        isSaving={false}
        transferListName="mockTransferListName"
        selectedContactType="PSTN"
        selectedSubEntityId="updateTransferListItem:mockId"
        transferListItemName="mockTransferListItemId"
        existingCategories={['category1', 'category2']}
        selectActiveQueueNames={['queue1', 'queue2']}
        initialValues="mockInitialValues"
        hierarchyInputText="mockHierarchyValue"
        endpointFieldValue="mockEndpointValue"
        isUserCreatingNewCategory={false}
        onCancel={() => {}}
        handleSubmit={() => {}}
        change={() => {}}
        clearFields={() => {}}
      />
    );
    expect(render).toMatchSnapshot();
  });
  it('renders update category header form', () => {
    const render = shallow(
      <TransferListItemsForm
        isSaving={false}
        transferListName="mockTransferListName"
        selectedContactType="SIP"
        selectedSubEntityId="updateCategoryHeader:mockId"
        transferListItemName="mockTransferListItemId"
        existingCategories={['category1', 'category2']}
        selectActiveQueueNames={['queue1', 'queue2']}
        initialValues="mockInitialValues"
        hierarchyInputText="mockHierarchyValue"
        endpointFieldValue="mockEndpointValue"
        isUserCreatingNewCategory={false}
        onCancel={() => {}}
        handleSubmit={() => {}}
        change={() => {}}
        clearFields={() => {}}
      />
    );
    expect(render).toMatchSnapshot();
  });
});
