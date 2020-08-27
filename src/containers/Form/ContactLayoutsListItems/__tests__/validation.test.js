/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { Map, fromJS } from 'immutable';
import { formValidation } from '../validation';

describe('formValidation', () => {
  it('returns undefined when valid fields values are provided', () => {
    const values = new Map({
      name: 'mockAttributeName',
      hierarchy: 'mock Hirearchy'
    });
    const props = {
      selectedSubEntityId: 'create',
      existingCategories: fromJS([{ hierarchy: 'mockHierarchy1', categoryUUID: 'mockCategoryUUID' }])
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper error object when empty values are provided', () => {
    const values = new Map({
      name: '',
      hierarchy: ''
    });
    const props = {
      existingCategories: fromJS([{ hierarchy: 'mockHierarchy1', categoryUUID: 'mockCategoryUUID' }]),
      contactAttributesNames: ['mockAttribute1', 'mockAttribute2']
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper error object when wrong values are provided while creating a new category', () => {
    const values = new Map({
      name: 'mockAttributeName',
      hierarchy: ' mockHierarchy '
    });
    const props = {
      selectedSubEntityId: 'create',
      existingCategories: fromJS([{ hierarchy: 'mockHierarchy', categoryUUID: 'mockCategoryUUID' }]),
      contactAttributesNames: ['mockAttribute1', 'mockAttribute2']
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
  it('returns proper error object when wrong values are provided while updating an existing category', () => {
    const values = new Map({
      name: 'mockAttributeName',
      hierarchy: 'mockHierarchy ',
      categoryUUID: 'mockCategoryUUID'
    });
    const props = {
      selectedSubEntityId: 'createListItem',
      existingCategories: fromJS([
        { hierarchy: 'mockExistingHierarchy1', categoryUUID: 'mockCategoryUUID1' },
        { hierarchy: 'mockHierarchy', categoryUUID: 'mockCategoryUUID2' }
      ]),
      contactAttributesNames: ['mockAttribute1', 'mockAttribute2']
    };
    expect(formValidation(values, props)).toMatchSnapshot();
  });
});
