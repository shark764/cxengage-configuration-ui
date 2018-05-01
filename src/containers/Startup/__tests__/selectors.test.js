/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { hasStarted } from '../selectors';

import {
  getBranding,
  getProtectedBranding
} from '../../../redux/modules/entities/branding/selectors';

jest.mock('../../../redux/modules/entities/branding/selectors');
getBranding.mockReturnValue('mock branding');
getProtectedBranding.mockReturnValue('mock protected branding');

describe('hasStarted', () => {
  describe('when both branding and protected branding are defined', () => {
    it('returns true', () => {
      expect(hasStarted()).toBe(true);
    });
  });
  describe('when branding is undefined', () => {
    beforeEach(() => {
      getBranding.mockReturnValueOnce(undefined);
    });
    it('returns false', () => {
      expect(hasStarted()).toBe(false);
    });
  });
  describe('when protected branding is undefined', () => {
    beforeEach(() => {
      getProtectedBranding.mockReturnValueOnce(undefined);
    });
    it('returns false', () => {
      expect(hasStarted()).toBe(false);
    });
  });
});
