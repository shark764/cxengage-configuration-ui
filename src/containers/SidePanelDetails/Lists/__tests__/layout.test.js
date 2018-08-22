/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ListsDetailsPanel from '../layout';

describe('<ListsDetailsPanel />', () => {
  let customTableItems;
  let customTableFields;
  beforeEach(() => {
    customTableItems = [
      {
        tableField1: 'test 1',
        tableField2: 'test 2',
        tableField3: 'test 3',
        tableField4: 'test 4'
      }
    ];
    customTableFields = [
      {
        type: 'string',
        name: 'tableField1',
        label: 'label 1',
        required: true
      },
      {
        type: 'string',
        name: 'tableField2',
        label: 'label 2',
        required: true
      },
      {
        type: 'string',
        name: 'tableField3',
        label: 'label 3',
        required: true
      },
      {
        type: 'string',
        name: 'tableField4',
        label: 'label 4',
        required: true
      }
    ];
  });
  it('renders lists detailsPanel', () => {
    const rendered = shallow(
      <ListsDetailsPanel
        id="7a96c534-31f9-11n8-88b9-9440dab83f21"
        className="details-panel"
        userHasUpdatePermission={true}
        alertMessage=""
        children={'Mock Child'}
        listType="Reason Codes Type"
        tableItems={customTableItems}
        tableFields={customTableFields}
        openCreateListItemModal={() => {}}
        updateSubEntity={() => {}}
        deleteSubEntity={() => {}}
        inherited={true}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
