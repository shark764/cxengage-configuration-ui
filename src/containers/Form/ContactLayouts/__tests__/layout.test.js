/*
 * Copyright © 2015-2019 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';
import ContactLayoutsForm from '../layout';

describe('<ContactLayoutsForm />', () => {
  it('renders LoadingSpinnerSVG while contact attributes are stil fetching', () => {
    const rendered = shallow(
      <ContactLayoutsForm
        name="mockName"
        description="mockDescription"
        layout="mockLayout"
        active={false}
        isSaving={false}
        inherited={false}
        contactLayoutsHeaders={List([])}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        removeCategoryItems={() => {}}
        isContactAttributesFetching={true}
        missingMandatoryAttributesNames={List(['missingAttribute'])}
        setSelectedSubEntityId={() => {}}
        removeContactLayoutsListItem={() => {}}
        selectedEntityId="create"
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders create form', () => {
    const rendered = shallow(
      <ContactLayoutsForm
        name="mockName"
        description="mockDescription"
        layout="mockLayout"
        active={false}
        isSaving={false}
        inherited={false}
        contactLayoutsHeaders={List([])}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        removeCategoryItems={() => {}}
        isContactAttributesFetching={false}
        missingMandatoryAttributesNames={List(['missingAttribute'])}
        setSelectedSubEntityId={() => {}}
        removeContactLayoutsListItem={() => {}}
        selectedEntityId="create"
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <ContactLayoutsForm
        name="mockName"
        description="mockDescription"
        layout="mockLayout"
        active={false}
        isSaving={false}
        inherited={false}
        contactLayoutsHeaders={List([])}
        userHasUpdatePermission={true}
        handleSubmit={() => {}}
        removeCategoryItems={() => {}}
        isContactAttributesFetching={false}
        missingMandatoryAttributesNames={List(['missingAttribute'])}
        setSelectedSubEntityId={() => {}}
        removeContactLayoutsListItem={() => {}}
        selectedEntityId="0000-0000-0000-0000-0000"
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
