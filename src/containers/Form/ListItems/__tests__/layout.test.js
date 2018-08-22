/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ListItemsForm from '../layout';

describe('<ListItemsForm />', () => {
  let customFieldItems;
  beforeEach(() => {
    customFieldItems = [
      {
        type: 'string',
        name: 'Test Field Item Name 1',
        label: 'Test Field Item Label 1',
        required: false
      },
      {
        type: 'number',
        name: 'Test Field Item Name 1',
        label: 'Test Field Item Label 1',
        required: false
      },
      {
        type: 'boolean',
        name: 'Test Field Item Name 1',
        label: 'Test Field Item Label 1',
        required: false
      }
    ];
  });
  it('renders create list item', () => {
    const rendered = shallow(
      <ListItemsForm
        listName="Disposition Code List"
        listItemName="Sale Made"
        fieldItems={customFieldItems}
        handleSubmit={() => {}}
        onCancel={() => {}}
        isSaving={false}
        pristine={false}
        invalid={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update list item', () => {
    const rendered = shallow(
      <ListItemsForm
        listName=""
        listItemName="Angry Customer"
        fieldItems={customFieldItems}
        handleSubmit={() => {}}
        onCancel={() => {}}
        isSaving={false}
        pristine={false}
        invalid={false}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
