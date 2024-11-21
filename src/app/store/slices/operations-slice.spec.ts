import operationsReducer, { setOperations } from './operations-slice';
import { OperationsState } from '@/shared/types/operations-state';
import { Operation } from '@/shared/interfaces/operations';

describe('operationsSlice', () => {
  const initialState: OperationsState = {
    operations: []
  };

  it('should handle the initial state', () => {
    const state = operationsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should handle setOperations', () => {
    const mockOperations: Operation[] = [
      {
        id: '1',
        type: 'ADDITION',
        cost: 1000
      },
      {
        id: '2',
        type: 'SUBTRACTION',
        cost: 500
      }
    ];

    const newState = operationsReducer(
      initialState,
      setOperations(mockOperations)
    );

    expect(newState.operations).toEqual(mockOperations);
    expect(newState.operations.length).toBe(2);
    expect(newState.operations[0].type).toBe('ADDITION');
    expect(newState.operations[1].type).toBe('SUBTRACTION');
  });
});
