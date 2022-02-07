import { ModelType } from '../../enums/model-type.enum';
import { BaseModel } from '../../models/base.model';
import { createCursor, parseCursor } from '../cursor.util';

describe('createCursor', () => {
  it('should create cursor string', () => {
    // Arrange
    const model: BaseModel = {
      id: 'id',
      tenantId: 'tenantId',
      itemKey: 'itemKey',
      gsiSortKey: 'gsiSortKey',
      type: ModelType.TEMPLATE,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    };

    // Act
    const cursor = createCursor(model);

    // Assert
    expect(cursor).toBe(Buffer.from('["tenantId","itemKey","gsiSortKey"]').toString('base64'));
  });
});

describe('parseCursor', () => {
  it('should parse cursor string', () => {
    // Arrange
    const cursorBase64 = 'WyJ0ZW5hbnRJZCIsIml0ZW1LZXkiLCJnc2lTb3J0S2V5Il0=';

    // Act
    const cursorObj = parseCursor(cursorBase64);

    // Assert
    expect(cursorObj).toStrictEqual({
      gsiSortKey: 'gsiSortKey',
      itemKey: 'itemKey',
      tenantId: 'tenantId',
    });
  });
});
