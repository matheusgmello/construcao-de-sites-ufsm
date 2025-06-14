document.addEventListener('DOMContentLoaded', function () {
  const cpfInput = document.getElementById('cpf');
  const telefoneInput = document.getElementById('telefone');
  const form = document.getElementById('pedidoForm');

  // Máscara para CPF
  if (cpfInput) {
    cpfInput.addEventListener('input', function (e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = value;
    });
  }

  // Validação de CPF
  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    if (parseInt(cpf[9]) !== digito1) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    return parseInt(cpf[10]) === digito2;
  }

  // Máscara para telefone
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function (e) {
      let input = e.target.value.replace(/\D/g, '');
      if (input.length > 11) input = input.slice(0, 11);

      let formatted;
      if (input.length <= 10) {
        formatted = input.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        formatted = input.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }

      telefoneInput.value = formatted;
    });
  }

  // Envio do formulário com validação e modal
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!validarCPF(cpfInput.value)) {
        e.preventDefault();
        alert('CPF inválido. Por favor, verifique e tente novamente.');
        cpfInput.focus();
        return;
      }

      e.preventDefault(); // evita envio padrão

      if (form.checkValidity()) {
        const modal = new bootstrap.Modal(document.getElementById('pedidoModal'));
        modal.show();
        form.reset(); // limpa os campos após envio
      } else {
        form.reportValidity();
      }
    });
  }
});
