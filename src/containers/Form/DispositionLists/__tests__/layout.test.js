/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import DispositionListsForm from '../layout';

describe('<DispositionListsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <DispositionListsForm
        name="mockName"
        description="mockDescription"
        externalId="mockExternalId"
        shared={false}
        active={true}
        isSaving={false}
        inherited={false}
        dispositions={[]}
        dispositionHeaders={{}}
        userHasUpdatePermission={true}
        userHasSharePermission={false}
        selectedEntityId="0000-0000-0000-0000-0000"
        handleSubmit={() => {}}
        removeDispositionListItem={() => {}}
        removeCategoryItems={() => {}}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <DispositionListsForm
        name="mockName"
        description="mockDescription"
        externalId="mockExternalId"
        shared={false}
        active={true}
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        dispositions={[]}
        dispositionHeaders={{}}
        userHasUpdatePermission={true}
        userHasSharePermission={true}
        selectedEntityId="0000-0000-0000-0000-0000"
        handleSubmit={() => {}}
        removeDispositionListItem={() => {}}
        removeCategoryItems={() => {}}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
