import { mediaPropertiesColumn } from '../mediaProperties';

describe('mediaPropertiesColumn', () => {
  it('is configured correctly', () => {
    expect(mediaPropertiesColumn).toMatchSnapshot();
  });
  describe('accessor', () => {
    it('accesses correctly', () => {
      expect(
        mediaPropertiesColumn.accessor({
          type: 'tts',
          properties: {
            language: 'en-US',
            voice: 'alice',
          },
        })
      ).toEqual('{"language":"en-US","voice":"alice"}');
    });
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(
        mediaPropertiesColumn.Cell({
          value: '{"language":"en-US","voice":"alice"}',
          row: { properties: '{"language":"en-US","voice":"alice"}' },
        })
      ).toMatchSnapshot();
    });
  });
});
