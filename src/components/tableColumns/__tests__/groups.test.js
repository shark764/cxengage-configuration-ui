import groups from '../groups';

describe('groups table column', () => {
  it('function returns correct object', () => {
    expect(groups('groups', 'mockTableType')).toMatchSnapshot();
  });
  it('accessor returns groups names as a string seperated by commas', () => {
    expect(
      groups('groups', 'mockTableType').accessor({
        agents: [
          {
            groups: [{ groupName: 'mockSkill1' }, { groupName: 'mockSkill2' }]
          },
          {
            groups: [{ groupName: 'mockSkill3' }, { groupName: 'mockSkill4' }]
          },
          { groups: [{ groupName: 'mockSkill5' }, { groupName: 'mockSkill6' }] }
        ]
      })
    ).toMatchSnapshot();
  });
  it('accessor returns single skill name with no comma', () => {
    expect(
      groups('groups', 'mockTableType').accessor({
        agents: [{ groups: [{ groupName: 'mockSkill1' }] }]
      })
    ).toMatchSnapshot();
  });
  it('accessor returns groups names as a string seperated by commas avoiding duplicate groups from multiple agents', () => {
    expect(
      groups('groups', 'mockTableType').accessor({
        agents: [
          {
            groups: [{ groupName: 'mockSkill1' }, { groupName: 'mockSkill2' }]
          },
          {
            groups: [{ groupName: 'mockSkill1' }, { groupName: 'mockSkill2' }]
          },
          { groups: [{ groupName: 'mockSkill1' }, { groupName: 'mockSkill2' }] }
        ]
      })
    ).toMatchSnapshot();
  });
  it('Cell returns the value wrapped in a span', () => {
    expect(
      groups('groups', 'mockTableType').Cell({ value: 'mockValue' })
    ).toMatchSnapshot();
  });
});
