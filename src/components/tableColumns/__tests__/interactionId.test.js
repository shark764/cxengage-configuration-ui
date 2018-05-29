import interactionIdColumn, { interactionIdCell } from '../interactionId';

describe('InteractionId column', () => {
  it('returns the proper object configuration for the row', () => {
    expect(interactionIdColumn('0000-0000-0000-0001')).toMatchSnapshot();
  });
  it('renders the cell properly given a value', () => {
    expect(interactionIdCell('0000-0000-0000-0002')).toMatchSnapshot();
  });
  it('calling the columns Cell method with a value prop renders properly', () => {
    const cellObject = interactionIdColumn('0000-0000-0000-0001');
    expect(cellObject.Cell({ value: '0000-0000-0000-0003' })).toMatchSnapshot();
  });
});
