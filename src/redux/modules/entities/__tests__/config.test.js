import { hasCustomUpdateEntity } from '../config.js';

describe('hasCustomUpdateEntity', () => {
    it('entityName passed in has a custom update entity epic , ', () => {
        expect(hasCustomUpdateEntity('emailTemplates')).toEqual(false);
    });
    it('entityName passed in does not have a custom update entity epic , ', () => {
        expect(hasCustomUpdateEntity('mockEntity')).toEqual(true);
    });
})
