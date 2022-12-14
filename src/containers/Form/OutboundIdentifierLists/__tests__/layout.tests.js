import React from 'react';
import { shallow } from 'enzyme';
import OutboundIdentifierListsForm from '../layout';

describe('OutboundIdentifierListsForm', () => {
  it('renders regular form', () => {
    const component = shallow(
      <OutboundIdentifierListsForm
        handleSubmit={() => 'mockFunctionReturn'}
        isSaving={false}
        inherited={false}
        userHasCurrentFormPermission={true}
        flowIds={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('renders, isSaving is true, fields should be disabled', () => {
    const component = shallow(
      <OutboundIdentifierListsForm
        handleSubmit={() => 'mockFunctionReturn'}
        isSaving={true}
        inherited={false}
        userHasCurrentFormPermission={true}
        flowIds={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('renders, inherited is true, fields should be disabled', () => {
    const component = shallow(
      <OutboundIdentifierListsForm
        handleSubmit={() => 'mockFunctionReturn'}
        isSaving={false}
        inherited={true}
        userHasCurrentFormPermission={true}
        flowIds={[]}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
