const test = require('node:test');
const assert = require('node:assert/strict');
const { isValidPhone } = require('../utils/phoneValidation');

test('aceita telefones com DDD e quantidade válida de dígitos', () => {
  assert.equal(isValidPhone('11912345678'), true);
  assert.equal(isValidPhone(' 1133334444 '), true);
});

test('rejeita letras, espaços, números decimais e comprimentos inválidos', () => {
  assert.equal(isValidPhone('abc'), false);
  assert.equal(isValidPhone('12.34'), false);
  assert.equal(isValidPhone('12 34'), false);
  assert.equal(isValidPhone('123456789'), false);
  assert.equal(isValidPhone('123456789012'), false);
  assert.equal(isValidPhone(''), false);
});
