import { isIgnoredToast, explicitSuccessIgnores } from '../errors';

describe('isIgnoredToast', () => {
    it('is an ignored error', () => {
        expect(isIgnoredToast('FETCH_DATA', 'branding')).toEqual(true);
    });
    it('is an ignored success api call', () => {
        explicitSuccessIgnores.forEach(x => expect(isIgnoredToast(x)).toEqual(true));
    });
    it('is not an ignored toast message, a catch all for the rest of the actions passed trought', () => {
        expect(isIgnoredToast('action', 'entityName')).toEqual(false);
    });
})
