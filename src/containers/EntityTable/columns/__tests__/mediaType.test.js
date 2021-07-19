import { mediaTypeColumn } from '../mediaType';

describe('mediaTypeColumn', () => {
  it('is configured correctly', () => {
    expect(mediaTypeColumn).toMatchSnapshot();
  });
  describe('accessor', () => {
    it('accesses correctly tts', () => {
      expect(mediaTypeColumn.accessor({ type: 'tts' })).toEqual('tts');
    });
    it('accesses correctly audio', () => {
      expect(mediaTypeColumn.accessor({ type: 'audio' })).toEqual('audio');
    });
    it('accesses correctly list', () => {
      expect(mediaTypeColumn.accessor({ type: 'list' })).toEqual('list');
    });
  });
  describe('Cell', () => {
    it('renders correctly tts', () => {
      expect(mediaTypeColumn.Cell({ value: 'tts', row: { mediaType: 'tts' } })).toMatchSnapshot();
    });
    it('renders correctly audio', () => {
      expect(mediaTypeColumn.Cell({ value: 'audio', row: { mediaType: 'audio' } })).toMatchSnapshot();
    });
    it('renders correctly list', () => {
      expect(mediaTypeColumn.Cell({ value: 'list', row: { mediaType: 'list' } })).toMatchSnapshot();
    });
  });
  it("returns nothing when there's no media type", () => {
    expect(mediaTypeColumn.accessor({})).toBeFalsy();
  });
  describe('filterMethod', () => {
    it('returns true when filter is "all"', () => {
      expect(mediaTypeColumn.filterMethod({ value: 'all' })).toBe(true);
    });
    it('compares filter id to "Audio" when filter value is "audio"', () => {
      expect(mediaTypeColumn.filterMethod({ value: 'Audio', id: 'mediaType' }, { mediaType: 'audio' })).toBe(true);
    });
    it('compares filter id to "Test-to-Speech" when filter value is "tts"', () => {
      expect(mediaTypeColumn.filterMethod({ value: 'Text-to-Speech', id: 'mediaType' }, { mediaType: 'tts' })).toBe(
        true
      );
    });
    it('compares filter id to "Media List" when filter value is "list"', () => {
      expect(mediaTypeColumn.filterMethod({ value: 'Media List', id: 'mediaType' }, { mediaType: 'list' })).toBe(true);
    });
  });
});
