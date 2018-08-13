import React from 'react';
import { shallow } from 'enzyme';
import { OutboundIdentifierListsFormLayout } from '../layout';

describe('OutboundIdentifierListsFormLayout', () => {
  it('renders regular form', () => {
    const component = shallow(
      <OutboundIdentifierListsFormLayout
        handleSubmit={() => 'mockFunctionReturn'}
        isSaving={false}
        inherited={false}
        flowIds={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('renders , isSaving is true , fields should be disabled', () => {
    const component = shallow(
      <OutboundIdentifierListsFormLayout
        handleSubmit={() => 'mockFunctionReturn'}
        isSaving={true}
        inherited={false}
        flowIds={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('renders , inherited is true , fields should be disabled', () => {
    const component = shallow(
      <OutboundIdentifierListsFormLayout
        handleSubmit={() => 'mockFunctionReturn'}
        isSaving={false}
        inherited={true}
        flowIds={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
