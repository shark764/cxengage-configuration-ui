/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { shallow } from 'enzyme';
import { statusColumn } from '../status';

describe('statusColumn', () => {
  it('is configured correctly', () => {
    expect(statusColumn).toMatchSnapshot();
  });
  describe('accessor', () => {
    it('returns "Enabled" when active is true', () => {
      expect(statusColumn.accessor({ active: true })).toEqual('Enabled');
    });
    it('returns "Disabled" when active is false', () => {
      expect(statusColumn.accessor({ active: false })).toEqual('Disabled');
    });
  });
  describe('filterMethod', () => {
    it('returns true when filter is "all"', () => {
      expect(statusColumn.filterMethod({ value: 'all' })).toBe(true);
    });
    it('compares filter id to "Enabled" when filter value is "enabled"', () => {
      expect(
        statusColumn.filterMethod(
          { value: 'enabled', id: 'status' },
          { status: 'Enabled' }
        )
      ).toBe(true);
      expect(
        statusColumn.filterMethod(
          { value: 'enabled', id: 'status' },
          { status: 'Disabled' }
        )
      ).toBe(false);
    });
    it('compares filter id to "Disabled" when filter value is "disabled"', () => {
      expect(
        statusColumn.filterMethod(
          { value: 'disabled', id: 'status' },
          { status: 'Disabled' }
        )
      ).toBe(true);
      expect(
        statusColumn.filterMethod(
          { value: 'disabled', id: 'status' },
          { status: 'Enabled' }
        )
      ).toBe(false);
    });
  });
  describe('Filter', () => {
    it('renders correctly', () => {
      expect(statusColumn.Filter({})).toMatchSnapshot();
      expect(
        shallow(statusColumn.Filter({ filter: { value: 'mock filter value' } }))
          .find('select')
          .prop('value')
      ).toEqual('mock filter value');
    });
    it('calls onchange', () => {
      const onChangeMock = jest.fn();
      const Filter = statusColumn.Filter({ onChange: onChangeMock });
      const component = shallow(Filter);
      component.find('select').simulate('change', {
        target: { value: 'mock value' }
      });
      expect(onChangeMock).toBeCalled();
    });
  });
});
