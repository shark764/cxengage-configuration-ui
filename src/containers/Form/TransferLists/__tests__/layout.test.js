/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import TransferListsForm from '../layout';

describe('<TransferListsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <TransferListsForm
        name="mockName"
        description="mockDescription"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        setSelectedSubEntityId={() => {}}
        removeTransferListItem={() => {}}
        removeCategoryItems={() => {}}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <TransferListsForm
        name="mockName"
        description="mockDescription"
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        userHasUpdatePermission={true}
        setSelectedSubEntityId={() => {}}
        removeTransferListItem={() => {}}
        removeCategoryItems={() => {}}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
