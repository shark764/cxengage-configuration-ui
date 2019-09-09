import { messageTemplateFormInitialValues, isDisplayContentInHtml } from '../selectors';
import { fromJS } from 'immutable';

describe('MessageTemplateForm selectors', () => {
  it('initial values while creating a new messageTemplate', () => {
    const mockState = fromJS({
      Entities: {
        currentEntity: 'messageTemplates',
        messageTemplates: {
          selectedEntityId: 'create',
          data: [
            {
              id: 'mockId',
              name: 'mock Template Name',
              description: 'mock description',
              channels: ['sms', 'messaging', 'email'],
              type: 'plaintext',
              template: 'mock template text'
            }
          ]
        }
      }
    });
    expect(messageTemplateFormInitialValues(mockState)).toMatchSnapshot();
  });
  it('initial values while updating an existing messageTemplate', () => {
    const mockState = fromJS({
      Entities: {
        currentEntity: 'messageTemplates',
        messageTemplates: {
          selectedEntityId: 'mockEntityId1',
          data: [
            {
              id: 'mockEntityId1',
              name: 'mock Template Name',
              description: 'mock description',
              channels: ['sms', 'messaging', 'email'],
              type: 'plaintext',
              template: 'mock template text'
            }
          ]
        }
      }
    });
    expect(messageTemplateFormInitialValues(mockState)).toMatchSnapshot();
  });
  it('retrieves isDisplayContentInHtml from the state', () => {
    const mockState = fromJS({
      Entities: {
        currentEntity: 'messageTemplates',
        messageTemplates: {
          selectedEntityId: 'mockEntityId1',
          data: [
            {
              id: 'mockEntityId1',
              name: 'mock Template Name',
              description: 'mock description',
              channels: ['sms', 'messaging', 'email'],
              type: 'plaintext',
              template: 'mock template text'
            }
          ],
          isDisplayContentInHtml: true
        }
      }
    });
    expect(isDisplayContentInHtml(mockState)).toMatchSnapshot();
  });
});
