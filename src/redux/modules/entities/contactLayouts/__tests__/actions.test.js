/*
 * Copyright © 2015-2020 Serenova, LLC. All rights reserved.
 */

import { removeContactLayoutsListItem } from '../actions';

describe('removeContactLayoutsListItem', () => {
  it('when type is contactLayoutsListItem', () => {
    expect(removeContactLayoutsListItem('contactLayoutsListItem', 'mockId')).toMatchSnapshot();
  });
  it('when type is categoryItems', () => {
    expect(removeContactLayoutsListItem('categoryItems', 'mockId')).toMatchSnapshot();
  });
});
