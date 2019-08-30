import agent from '../agents';

describe('agent table column', () => {
  it('function returns correct object', () => {
    expect(agent()).toMatchSnapshot();
  });
  it('accessor returns agents names as a string seperated by commas', () => {
    expect(
      agent().accessor({
        agents: [
          { agentName: 'firstName1 lastName1' },
          { agentName: 'firstName2 lastName2' },
          { agentName: 'firstName3 lastName3' }
        ]
      })
    ).toMatchSnapshot();
  });
  it('accessor returns single agents name with no comma', () => {
    expect(agent().accessor({ agents: [{ agentName: 'firstName1 lastName1' }] })).toMatchSnapshot();
  });
  it('Cell returns the value wrapped in a span', () => {
    expect(agent().Cell({ value: 'mockValue' })).toMatchSnapshot();
  });
});
