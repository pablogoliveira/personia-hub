
export const validateField = (fieldName: string, value: any): string | null => {
  if (value === undefined || value === null) {
    return 'Este campo é obrigatório';
  }

  switch (fieldName) {
    case 'nome':
      if (!value.trim()) {
        return 'O nome é obrigatório';
      }
      if (value.trim().length < 3) {
        return 'O nome deve ter pelo menos 3 caracteres';
      }
      return null;

    case 'dataNascimento':
      if (!value) {
        return 'A data de nascimento é obrigatória';
      }
      try {
        const date = new Date(value);
        const today = new Date();
        if (date > today) {
          return 'A data de nascimento não pode ser no futuro';
        }
        
        // Check if person is at least 18 years old (optional)
        // const age = today.getFullYear() - date.getFullYear();
        // if (age < 18) {
        //   return 'A pessoa deve ter pelo menos 18 anos';
        // }
        
        return null;
      } catch (e) {
        return 'Data de nascimento inválida';
      }

    case 'nomeMae':
      if (!value.trim()) {
        return 'O nome da mãe é obrigatório';
      }
      if (value.trim().length < 3) {
        return 'O nome da mãe deve ter pelo menos 3 caracteres';
      }
      return null;

    case 'rg':
      if (!value.trim()) {
        return 'O RG é obrigatório';
      }
      if (!/^\d{1,3}(\.?\d{3}){1,2}-?[\dXx]?$/.test(value.trim())) {
        return 'RG inválido';
      }
      return null;

    case 'cpf':
      if (!value.trim()) {
        return 'O CPF é obrigatório';
      }
      
      // Remove non-digits
      const cpf = value.replace(/\D/g, '');
      
      if (cpf.length !== 11) {
        return 'CPF deve conter 11 dígitos';
      }
      
      // Check if all digits are the same
      if (/^(\d)\1+$/.test(cpf)) {
        return 'CPF inválido';
      }
      
      // Validate CPF algorithm
      let sum = 0;
      let remainder;
      
      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
      
      if (remainder !== parseInt(cpf.substring(9, 10))) {
        return 'CPF inválido';
      }
      
      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
      
      if (remainder !== parseInt(cpf.substring(10, 11))) {
        return 'CPF inválido';
      }
      
      return null;

    case 'cep':
      if (!value.trim()) {
        return 'O CEP é obrigatório';
      }
      if (!/^\d{5}-?\d{3}$/.test(value.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2'))) {
        return 'CEP inválido';
      }
      return null;

    case 'logradouro':
      if (!value.trim()) {
        return 'O logradouro é obrigatório';
      }
      return null;

    case 'numero':
      if (!value.trim()) {
        return 'O número é obrigatório';
      }
      return null;

    case 'bairro':
      if (!value.trim()) {
        return 'O bairro é obrigatório';
      }
      return null;

    case 'cidade':
      if (!value.trim()) {
        return 'A cidade é obrigatória';
      }
      return null;

    case 'estado':
      if (!value.trim()) {
        return 'O estado é obrigatório';
      }
      if (value.length !== 2) {
        return 'O estado deve ter 2 caracteres';
      }
      return null;

    case 'telefone':
      if (!value.trim()) {
        return 'O telefone é obrigatório';
      }
      
      // Remove non-digits
      const phone = value.replace(/\D/g, '');
      
      if (phone.length < 10 || phone.length > 11) {
        return 'Telefone deve ter 10 ou 11 dígitos (com DDD)';
      }
      
      if (phone.length === 11 && phone[2] !== '9') {
        return 'Celular deve começar com 9 após o DDD';
      }
      
      return null;

    case 'email':
      if (!value.trim()) {
        return 'O e-mail é obrigatório';
      }
      
      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'E-mail inválido';
      }
      
      return null;

    default:
      if (typeof value === 'string' && !value.trim()) {
        return 'Este campo é obrigatório';
      }
      return null;
  }
};
