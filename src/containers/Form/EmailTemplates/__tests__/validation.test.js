/*
 * Copyright © 2015-2018 Serenova, LLC. All rights reserved.
 */

import { fromJS } from 'immutable';
import { validate } from '../validation';

describe('validate', () => {
  describe('with custom email', () => {
    describe('and both subject and body', () => {
      it('has no errors', () => {
        expect(
          validate(
            fromJS({
              email: 'custom',
              subject: 'mock subject',
              body: 'mock body'
            })
          )
        ).toEqual({});
      });
    });
    describe('missing subject', () => {
      it('errors', () => {
        expect(
          validate(fromJS({ email: 'custom', body: 'mock body' }))
        ).toMatchSnapshot();
      });
    });
    describe('missing body', () => {
      it('errors', () => {
        expect(
          validate(fromJS({ email: 'custom', subject: 'mock subject' }))
        ).toMatchSnapshot();
      });
    });
  });
  describe('with default email', () => {
    it('does no validation', () => {
      expect(validate(fromJS({ email: 'default' }))).toEqual({});
    });
  });
});
