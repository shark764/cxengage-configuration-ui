import { mediaSourceColumn } from '../mediaSource';
import { selectMedias, getMedias } from '../../../../redux/modules/entities/media/selectors';
import { fromJS } from 'immutable';

jest.mock('../../../../redux/modules/entities/media/selectors');

describe('mediaSourceColumn', () => {
  it('is configured correctly', () => {
    expect(mediaSourceColumn).toMatchSnapshot();
  });
  describe('accessor', () => {
    it('accesses non list type correctly', () => {
      expect(
        mediaSourceColumn.accessor({
          type: 'tts',
          source: 'mockSource',
        })
      ).toEqual('mockSource');
    });
    it('accesses list type correctly', () => {
      selectMedias.mockImplementation(() => [
        {
          value: 'mediaMockId_1',
          lable: 'Flow Mock 1',
          type: 'tts',
        },
        {
          value: 'mediaMockId_2',
          lable: 'Flow Mock 2',
          type: 'audio',
        },
        {
          value: 'mediaMockId_4',
          lable: 'Flow MOCK 4',
          type: 'audio',
        },
      ]);
      expect(
        mediaSourceColumn.accessor({
          name: 'Media List',
          source: ['mediaMockId_1'],
          type: 'list',
        })
      ).toMatchSnapshot();
    });
  });
  describe('Cell', () => {
    it('renders correctly', () => {
      expect(
        mediaSourceColumn.Cell({ value: 'mock media source', row: { mediaSource: 'mock media source' } })
      ).toMatchSnapshot();
    });
  });
});
