import { EntityMetaData, entitiesMetaData } from '../metaData';

describe('entitiesMetaData', () => {
    const mockEntity = new EntityMetaData('mockEntity');
    it('creates all metaData info', () => {
        expect(entitiesMetaData).toMatchSnapshot();
    });

    it('entityApiRequest, passing in subEntity as apiMethod',() => {
        expect(mockEntity.entityApiRequest('get','subEntity')).toMatchSnapshot();
        expect(mockEntity.entityApiRequest('create','subEntity')).toMatchSnapshot();
        expect(mockEntity.entityApiRequest('update','subEntity')).toMatchSnapshot();
    });
    it('entityApiRequest, passing in mainEntity as apiMethod',() => {
        expect(mockEntity.entityApiRequest('get','mainEntity')).toMatchSnapshot();
        expect(mockEntity.entityApiRequest('create','mainEntity')).toMatchSnapshot();
        expect(mockEntity.entityApiRequest('update','mainEntity')).toMatchSnapshot();
    });
    it('entityApiRequest, passing in singleMainEntity as apiMethod',() => {
        expect(mockEntity.entityApiRequest('get','singleMainEntity')).toMatchSnapshot();
        expect(mockEntity.entityApiRequest('create','singleMainEntity')).toMatchSnapshot();
        expect(mockEntity.entityApiRequest('update','singleMainEntity')).toMatchSnapshot();
    });


    it('entityListItemApiRequest, passing in update as apiMethod',() => {
        expect(mockEntity.entityListItemApiRequest('update','singleMainEntity')).toMatchSnapshot();
    });
    it('entityListItemApiRequest, passing in any other apiMethod',() => {
        expect(mockEntity.entityListItemApiRequest('get','singleMainEntity')).toMatchSnapshot();
        expect(mockEntity.entityListItemApiRequest('create','singleMainEntity')).toMatchSnapshot();
    });
})
