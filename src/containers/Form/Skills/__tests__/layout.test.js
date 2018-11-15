/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import React from 'react';
import { shallow } from 'enzyme';

import SkillsForm from '../layout';

describe('<SkillsForm />', () => {
  it('renders create form', () => {
    const rendered = shallow(
      <SkillsForm
        name="mockName"
        description="mockDescription"
        hasProficiency={true}
        isSaving={false}
        inherited={false}
        disableProficiency={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders create form with no proficiency', () => {
    const rendered = shallow(
      <SkillsForm
        name="mockName"
        description="mockDescription"
        hasProficiency={false}
        isSaving={false}
        inherited={false}
        disableProficiency={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form', () => {
    const rendered = shallow(
      <SkillsForm
        name="mockName"
        description="mockDescription"
        hasProficiency={true}
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        disableProficiency={true}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
  it('renders update form with no proficiency', () => {
    const rendered = shallow(
      <SkillsForm
        name="mockName"
        description="mockDescription"
        hasProficiency={false}
        id="0000-0000-0000-0000-0000"
        isSaving={false}
        inherited={false}
        disableProficiency={false}
        handleSubmit={() => {}}
      />
    );
    expect(rendered).toMatchSnapshot();
  });
});
