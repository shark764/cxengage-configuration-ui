import { formValidation } from '../validation';
import { Map, fromJS } from 'immutable';

describe('formValidation', () => {
  it('returns proper object when name and type are provided', () => {
    const values = new Map({
      name: 'mockName',
      type: 'mockType',
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('returns proper object (errors) when name and type field is not provided', () => {
    const values = new Map({
      name: '',
      type: '',
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('returns proper object (errors) when wrong values are provided', () => {
    const values = new Map({
      name: undefined,
      type: null,
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('returns proper object (errors) when tts source is not provided', () => {
    const values = new Map({
      name: 'Test Media',
      type: 'tts',
      source: null,
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('returns proper object (errors) when tts source properties language and voice are not provided', () => {
    const values = new Map({
      name: 'Test Media',
      type: 'tts',
      source: 'Example text for speech to text',
      properties: new Map({
        language: '',
        voice: '',
      }),
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('returns proper object (errors) when audio source is not provided', () => {
    const values = new Map({
      name: 'Test Media',
      type: 'audio',
      source: null,
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('returns proper object (errors) when audio source is not valid url', () => {
    const values = new Map({
      name: 'Test Media',
      type: 'audio',
      source: 'not a url',
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('returns proper object when audio source is valid url', () => {
    const values = new Map({
      name: 'Test Media',
      type: 'audio',
      source: 'https://google.com/thisisvalidurl',
    });
    expect(formValidation(values)).toMatchSnapshot();
  });

  it('returns proper object (errors) when list source is not provided', () => {
    const values = new Map({
      name: 'Test Media',
      type: 'list',
      source: fromJS([]),
    });
    expect(formValidation(values)).toMatchSnapshot();
  });
});
