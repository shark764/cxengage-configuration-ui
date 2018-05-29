import skills from '../skills';

describe('skills table column', () => {
  it('function returns correct object', () => {
    expect(skills('Skills', 'mockTableType')).toMatchSnapshot();
  });
  it('accessor returns skills names as a string seperated by commas', () => {
    expect(
      skills('Skills', 'mockTableType').accessor({
        agents: [
          {
            skills: [{ skillName: 'mockSkill1' }, { skillName: 'mockSkill2' }]
          },
          {
            skills: [{ skillName: 'mockSkill3' }, { skillName: 'mockSkill4' }]
          },
          { skills: [{ skillName: 'mockSkill5' }, { skillName: 'mockSkill6' }] }
        ]
      })
    ).toMatchSnapshot();
  });
  it('accessor returns single skill name with no comma', () => {
    expect(
      skills('Skills', 'mockTableType').accessor({
        agents: [{ skills: [{ skillName: 'mockSkill1' }] }]
      })
    ).toMatchSnapshot();
  });
  it('accessor returns skills names as a string seperated by commas avoiding duplicate skills from multiple agents', () => {
    expect(
      skills('Skills', 'mockTableType').accessor({
        agents: [
          {
            skills: [{ skillName: 'mockSkill1' }, { skillName: 'mockSkill2' }]
          },
          {
            skills: [{ skillName: 'mockSkill1' }, { skillName: 'mockSkill2' }]
          },
          { skills: [{ skillName: 'mockSkill1' }, { skillName: 'mockSkill2' }] }
        ]
      })
    ).toMatchSnapshot();
  });
});
