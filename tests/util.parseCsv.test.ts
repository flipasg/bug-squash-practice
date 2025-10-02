import { describe, expect, it } from 'vitest';
import { parseCsv } from '../src/utils/parseCsv';

describe('parseCsv', () => {
  it('parses headerless CSV with CRLF and trims fields', () => {
    const input =
      ' title one , 2025-10-01T00:00:00.000Z , true\\r\\nTwo,2025-10-02T00:00:00.000Z,false\\r\\n';
    const rows = parseCsv(input);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({
      title: 'title one',
      dueDate: '2025-10-01T00:00:00.000Z',
      completed: true,
    });
    expect(rows[1]).toEqual({
      title: 'Two',
      dueDate: '2025-10-02T00:00:00.000Z',
      completed: false,
    });
  });
});
