const {isRealString} = require('./validation');

describe('tests for isRealStringFunction', () => {
    test('should reject non-string values', () => {
        expect(isRealString(1234)).toBeFalsy();
    });

    test('should reject string with only spaces', () => {
        expect(isRealString('      ')).toBeFalsy();
    });

    test('should allow string with non-space characters', () => {
        expect(isRealString('abcdefg')).toBeTruthy();
    });
});

