import recordsReducer, { setRecords, removeRecord } from './record-slice';
import { RecordsState } from '@/shared/types/record-state';
import { Record } from '@/shared/interfaces/records';

describe('recordsSlice', () => {
  const initialState: RecordsState = {
    records: [],
    totalPages: 0,
    isFirst: true,
    isLast: true
  };

  it('should handle the initial state', () => {
    const state = recordsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should handle setRecords', () => {
    const mockRecords: Record[] = [
      {
        id: '1',
        operation: {
          id: '1',
          type: 'ADDITION',
          cost: 50
        },
        user: 'user-1',
        amount: 255,
        userBalance: 100,
        operationResponse: 'Success',
        date: '2023-11-20',
        deleted: false
      },
      {
        id: '2',
        operation: {
          id: '2',
          type: 'SUBTRACTION',
          cost: 10
        },
        user: 'user-2',
        amount: 255,
        userBalance: 200,
        operationResponse: 'Success',
        date: '2023-11-20',
        deleted: false
      }
    ];

    const payload: RecordsState = {
      records: mockRecords,
      totalPages: 5,
      isFirst: false,
      isLast: false
    };

    const newState = recordsReducer(initialState, setRecords(payload));

    expect(newState.records).toEqual(mockRecords);
    expect(newState.totalPages).toBe(5);
    expect(newState.isFirst).toBe(false);
    expect(newState.isLast).toBe(false);
  });

  it('should handle removeRecord', () => {
    const mockInitialState: RecordsState = {
      records: [
        {
          id: '1',
          operation: {
            id: '1',
            type: 'ADDITION',
            cost: 50
          },
          user: 'user-1',
          amount: 255,
          userBalance: 100,
          operationResponse: 'Success',
          date: '2023-11-20',
          deleted: false
        },

        {
          id: '2',
          operation: {
            id: '2',
            type: 'SUBTRACTION',
            cost: 10
          },
          user: 'user-2',
          amount: 255,
          userBalance: 200,
          operationResponse: 'Success',
          date: '2023-11-20',
          deleted: false
        }
      ],
      totalPages: 5,
      isFirst: false,
      isLast: false
    };

    const newState = recordsReducer(mockInitialState, removeRecord('1'));

    expect(newState.records.length).toBe(1);
    expect(newState.records[0].id).toBe('2');
    expect(newState.records[0].user).toBe('user-2');
  });
});
