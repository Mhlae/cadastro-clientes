// Regra de negócio do telefone: aceitar apenas dígitos e exigir DDD + 8 ou 9 dígitos.
// Isso cobre telefones fixos e celulares no padrão brasileiro.
function isValidPhone(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const trimmed = value.trim();
  if (trimmed === '') {
    return false;
  }

  if (!/^\d+$/.test(trimmed)) {
    return false;
  }

  const digitsOnly = trimmed.replace(/\D/g, '');
  return digitsOnly.length >= 10 && digitsOnly.length <= 11;
}

module.exports = {
  isValidPhone,
};
