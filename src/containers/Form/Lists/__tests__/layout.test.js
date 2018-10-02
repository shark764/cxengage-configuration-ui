/*
 * Copyright © 2015-2017 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import ListsForm from '../layout';

describe('<ListsForm />', () => {
  let customListTypes;
  beforeEach(() => {
    customListTypes = [
      {
        label: 'Disposition Label',
        value: 'Disposition Value'
      },
      {
        label: 'Reason Label',
        value: 'Reason Value'
      }
    ];
  });
  it('renders create list', () => {
    const rendered = shallow(
      <ListsForm
        name="Disposition Code List"
        shared={false}
        listTypes={customListTypes}
        update={false}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update list', () => {
    const rendered = shallow(
      <ListsForm
        name="Reason Code List"
        shared={false}
        listTypes={customListTypes}
        listTypeId="57083781-332d-11e6-8dd4-c88eee4d9f61"
        update={true}
        isSaving={false}
        inherited={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
