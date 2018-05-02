import React from 'react';
import { shallow, mount } from 'enzyme';
import SupervisorToolbarLayout from '../Layout';
import { subscribe, unsubscribe } from '../Observable';
jest.mock('../Observable');
const toggleMuteMock = jest.fn();
const hangUpMock = jest.fn();
const startSupervisorToolbarSubscriptionsMock = jest.fn();

describe('Supervisor Toolbar Layout', () => {
  it('renders the hang up and unmute buttons when monitoringStatus is "connected" and muted is true', () => {
    const component = shallow(
      <SupervisorToolbarLayout
        requestingToggleMute={() => ''}
        requestingHangUp={() => ''}
        muted={true}
        twilioEnabled={true}
        twilioIsDefault={true}
        monitoringStatus={'connected'}
        interactionId={'interactionId'}
        setSilentMonitoringInteractionId={() => ''}
        startSupervisorToolbarSubscriptions={() => ''}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('renders an empty div when monitoringStatus is "offline"', () => {
    const component = shallow(
      <SupervisorToolbarLayout
        requestingToggleMute={() => ''}
        requestingHangUp={() => ''}
        muted={true}
        twilioEnabled={true}
        twilioIsDefault={true}
        monitoringStatus={'offline'}
        interactionId={'interactionId'}
        setSilentMonitoringInteractionId={() => ''}
        startSupervisorToolbarSubscriptions={() => ''}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('renders the hang up and mute buttons when monitoringStatus is "connected" and muted is false', () => {
    const component = shallow(
      <SupervisorToolbarLayout
        requestingToggleMute={() => ''}
        requestingHangUp={() => ''}
        muted={false}
        twilioEnabled={true}
        twilioIsDefault={true}
        monitoringStatus={'connected'}
        interactionId={'interactionId'}
        setSilentMonitoringInteractionId={() => ''}
        startSupervisorToolbarSubscriptions={() => ''}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('calls onchange', () => {
    const component3 = shallow(
      <SupervisorToolbarLayout
        requestingToggleMute={toggleMuteMock}
        requestingHangUp={hangUpMock}
        muted={false}
        twilioEnabled={true}
        twilioIsDefault={true}
        monitoringStatus={'connected'}
        interactionId={'interactionId'}
        setSilentMonitoringInteractionId={() => ''}
        startSupervisorToolbarSubscriptions={
          startSupervisorToolbarSubscriptionsMock
        }
      />
    );
    component3.find('#muteButton').simulate('click');
    expect(toggleMuteMock).toBeCalled();
    component3.find('#hangUpButton').simulate('click');
    expect(hangUpMock).toBeCalled();
  });
});

describe('Full mount to test lifecycle events', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(
      <SupervisorToolbarLayout
        requestingToggleMute={toggleMuteMock}
        requestingHangUp={hangUpMock}
        muted={false}
        twilioEnabled={true}
        twilioIsDefault={true}
        monitoringStatus={'connected'}
        interactionId={'interactionId'}
        setSilentMonitoringInteractionId={() => ''}
        startSupervisorToolbarSubscriptions={
          startSupervisorToolbarSubscriptionsMock
        }
      />
    );
    expect(startSupervisorToolbarSubscriptionsMock).toHaveBeenCalled();
    expect(subscribe).toHaveBeenCalled();
    wrapper.unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});