import { formValidation } from '../validation';
import { Map } from 'immutable';
import { selectActiveQueueNames } from '../../../../redux/modules/entities/transferLists/selectors';

jest.mock('../../../../redux/modules/entities/transferLists/selectors');
selectActiveQueueNames.mockImplementation(() => ['mockqueue1', 'mockqueue2']);

describe('formvalidation', () => {
  // createTransferListItemsForm && updateTransferListItemsForm Validations:
  it('returns proper object when creating a transferListItem with queue as a contact type', () => {
    const values = Map({
      coldTransfer: true,
      contactType: 'queue',
      endpoint: 'mockqueue1',
      hierarchy: 'mockHierarchy',
      name: 'mockCntactName',
      transferType: 'mockTransferType',
      warmTransfer: false
    });
    expect(formValidation(values, { selectedSubEntityId: 'updateTransferListItem:mockId' })).toMatchSnapshot();
  });
  it('returns proper object when creating a transferListItem with PSTN as a contact type', () => {
    const values = Map({
      coldTransfer: true,
      contactType: 'PSTN',
      endpoint: '+15064719056',
      hierarchy: 'mockHierarchy',
      name: 'mockCntactName',
      transferType: 'mockTransferType',
      warmTransfer: false
    });
    expect(formValidation(values, { selectedSubEntityId: 'updateTransferListItem:mockId' })).toMatchSnapshot();
  });
  it('returns proper object when creating a transferListItem with SIP as a contact type', () => {
    const values = Map({
      coldTransfer: true,
      contactType: 'SIP',
      endpoint: 'sip:123@gmail.com',
      hierarchy: 'mockHierarchy',
      name: 'mockCntactName',
      transferType: 'mockTransferType',
      warmTransfer: false
    });
    expect(formValidation(values, { selectedSubEntityId: 'updateTransferListItem:mockId' })).toMatchSnapshot();
  });

  it('returns proper errors when creating a transferListItem under an existing category without providing required fields', () => {
    const values = Map({
      newCategory: true,
      endpoint: undefined,
      hierarchy: '',
      name: ''
    });
    expect(formValidation(values, { selectedSubEntityId: 'updateTransferListItem:mockId' })).toMatchSnapshot();
  });
  it('returns proper errors when creating a transferListItem under a new category without providing required fields', () => {
    const values = Map({
      endpoint: undefined,
      hierarchy: '',
      name: '',
      contactType: 'selectContactType',
      transferType: 'selectTransferType'
    });
    expect(formValidation(values, { selectedSubEntityId: 'updateTransferListItem:mockId' })).toMatchSnapshot();
  });
  it('returns proper errors when creating a transferListItem with contactType queue', () => {
    const values = Map({
      endpoint: 'queueName1',
      hierarchy: '',
      name: '',
      contactType: 'queue',
      transferType: ''
    });
    expect(formValidation(values, { selectedSubEntityId: 'updateTransferListItem:mockId' })).toMatchSnapshot();
  });
  it('returns proper errors when creating a transferListItem with contactType PSTN', () => {
    const values = Map({
      endpoint: '5060001234',
      hierarchy: '',
      name: '',
      contactType: 'PSTN',
      transferType: ''
    });
    expect(formValidation(values, { selectedSubEntityId: 'updateTransferListItem:mockId' })).toMatchSnapshot();
  });
  it('returns proper errors when creating a transferListItem with contactType SIP', () => {
    const values = Map({
      endpoint: 'sipabc@gmail.com',
      hierarchy: '',
      name: '',
      contactType: 'SIP',
      transferType: ''
    });
    expect(formValidation(values, { selectedSubEntityId: 'updateTransferListItem:mockId' })).toMatchSnapshot();
  });

  // updateCategoryHeader Validations:
  it('returns proper object while updating category header with required field provided', () => {
    expect(
      formValidation(Map({ hierarchy: 'mockHierarchyId' }), { selectedSubEntityId: 'updateCategoryHeader:mockId' })
    ).toMatchSnapshot();
  });
  it('returns error object while updating category header with required field provided not provided', () => {
    expect(
      formValidation(Map({ hierarchy: '' }), { selectedSubEntityId: 'updateCategoryHeader:mockId' })
    ).toMatchSnapshot();
  });
  it('returns error object while updating category header with a wrong value provided in the required field ', () => {
    expect(
      formValidation(Map({ hierarchy: undefined }), { selectedSubEntityId: 'updateCategoryHeader:mockId' })
    ).toMatchSnapshot();
  });
});
