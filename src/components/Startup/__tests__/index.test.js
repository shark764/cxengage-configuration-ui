import React from 'react';
import { shallow, mount } from 'enzyme';
import Startup from '../';

describe('Startup', () => {
  describe('false hasStarted', () => {
    it('renders a loading spinner', () => {
      expect(
        shallow(
          <Startup hasStarted={false} start={() => {}}>
            Children
          </Startup>
        )
      ).toMatchSnapshot();
    });
  });
  describe('true hasStarted', () => {
    it('renders the children', () => {
      expect(
        shallow(
          <Startup hasStarted start={() => {}}>
            Children
          </Startup>
        )
      ).toMatchSnapshot();
    });
  });
  describe('componentDidMount', () => {
    it('calls start', () => {
      const mockStart = jest.fn();
      mount(
        <Startup hasStarted={false} start={mockStart}>
          Children
        </Startup>
      );
      expect(mockStart).toBeCalled();
    });
  });
});
