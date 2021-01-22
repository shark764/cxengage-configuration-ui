import { parseEDNString, toEDNString } from 'edn-data';
import { fromJS } from 'immutable';

export const ednRuleToImmutable = (ednRule) => {
  const { voice, ...groups } = parseEDNString(ednRule, { mapAs: 'object', keywordAs: 'string' });
  const parsedGroups = Object.entries(groups).map(([channels, numInteractions]) => ({
    channels: channels.split(','),
    interactions: numInteractions,
  }));

  return fromJS({
    voice: !!voice,
    groups: parsedGroups,
  });
};

export const jsRuletoEdn = ({ voice, groups }) =>
  toEDNString({
    map: [
      ...(voice ? [[[{ key: 'voice' }], 1]] : []),
      ...groups.map(({ channels, interactions }) => [
        channels.map((channel) => ({ key: channel })),
        parseInt(interactions, 10),
      ]),
    ],
  });
