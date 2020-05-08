/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ReasonListsForm from '../layout';

describe('<ReasonListsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <ReasonListsForm
        name="mockName"
        description="mockDescription"
        externalId="mockExternalId"
        shared={false}
        active={true}
        isSaving={false}
        isFetching={false}
        inherited={false}
        isDefault={false}
        reasons={[]}
        userHasUpdatePermission={true}
        userHasSharePermission={false}
        selectedEntityId="0000-0000-0000-0000-0000"
        handleSubmit={() => {}}
        removeReasonListItem={() => {}}
        removeCategoryItems={() => {}}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <ReasonListsForm
        name="mockName"
        description="mockDescription"
        externalId="mockExternalId"
        shared={false}
        active={true}
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        isFetching={false}
        inherited={false}
        isDefault={false}
        reasons={[]}
        userHasUpdatePermission={true}
        userHasSharePermission={true}
        selectedEntityId="0000-0000-0000-0000-0000"
        handleSubmit={() => {}}
        removeReasonListItem={() => {}}
        removeCategoryItems={() => {}}
        setSelectedSubEntityId={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
