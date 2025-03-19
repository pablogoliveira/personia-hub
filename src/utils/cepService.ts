
export type AddressData = {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  erro?: boolean;
};

const fetchAddressFromCep = async (cep: string): Promise<AddressData | null> => {
  // Remove any non-digit characters
  const cleanCep = cep.replace(/\D/g, '');
  
  if (cleanCep.length !== 8) {
    return null;
  }
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await response.json();
    
    if (data.erro) {
      return null;
    }
    
    return {
      logradouro: data.logradouro || '',
      bairro: data.bairro || '',
      cidade: data.localidade || '',
      estado: data.uf || '',
    };
  } catch (error) {
    console.error('Error fetching address from CEP:', error);
    return null;
  }
};

export default fetchAddressFromCep;
