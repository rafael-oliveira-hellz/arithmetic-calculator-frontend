import { twclsx } from './twclsx';

describe('twclsx utility', () => {
  it('should merge and resolve conflicting Tailwind classes', () => {
    const result = twclsx('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500'); // "text-blue-500" deve prevalecer
  });

  it('should handle conditional class merging with clsx', () => {
    const condition = true;
    const result = twclsx('text-center', condition && 'bg-blue-500');
    expect(result).toBe('text-center bg-blue-500');
  });

  it('should remove falsy values', () => {
    const result = twclsx('text-center', null, undefined, false, 'bg-red-500');
    expect(result).toBe('text-center bg-red-500');
  });

  it('should merge classes without conflicts', () => {
    const result = twclsx('text-red-500', 'bg-blue-500', 'p-4');
    expect(result).toBe('text-red-500 bg-blue-500 p-4');
  });

  it('should handle array inputs', () => {
    const result = twclsx(['text-red-500', 'text-blue-500'], 'bg-red-500');
    expect(result).toBe('text-blue-500 bg-red-500');
  });

  it('should prioritize tailwind-merge over clsx for conflicts', () => {
    const result = twclsx('text-red-500', 'text-blue-500', 'font-bold');
    expect(result).toBe('text-blue-500 font-bold');
  });

  it('should handle dynamic classes correctly', () => {
    const result = twclsx(
      { 'text-red-500': true, 'text-blue-500': false },
      'bg-yellow-500'
    );
    expect(result).toBe('text-red-500 bg-yellow-500');
  });
});
