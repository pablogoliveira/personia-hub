
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import FormField from '@/components/FormField';
import FormSection from '@/components/FormSection';
import useForm from '@/hooks/useForm';
import fetchAddressFromCep from '@/utils/cepService';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';

interface PersonFormData {
  id: string;
  nome: string;
  dataNascimento: string;
  nomeMae: string;
  rg: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
}

const initialValues: PersonFormData = {
  id: '',
  nome: '',
  dataNascimento: '',
  nomeMae: '',
  rg: '',
  cpf: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  telefone: '',
  email: '',
};

const PersonForm: React.FC = () => {
  const [formStep, setFormStep] = useState(0);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  
  const handleSubmit = async (values: PersonFormData) => {
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted with values:', values);
      setIsSubmitSuccess(true);
      toast.success('Cadastro realizado com sucesso!');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
        setIsSubmitSuccess(false);
        setFormStep(0);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Erro ao realizar cadastro. Tente novamente.');
    }
  };
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit: submitForm,
    setFieldValue,
    resetForm,
  } = useForm<PersonFormData>({
    initialValues,
    onSubmit: handleSubmit,
  });
  
  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e);
    const cep = e.target.value.replace(/\D/g, '');
    
    if (cep.length === 8) {
      setIsLoadingAddress(true);
      const addressData = await fetchAddressFromCep(cep);
      setIsLoadingAddress(false);
      
      if (addressData) {
        setFieldValue('logradouro', addressData.logradouro);
        setFieldValue('bairro', addressData.bairro);
        setFieldValue('cidade', addressData.cidade);
        setFieldValue('estado', addressData.estado);
        
        // Focus on the number field after filling in the address
        setTimeout(() => {
          const numeroInput = document.getElementById('numero');
          if (numeroInput) numeroInput.focus();
        }, 100);
      } else {
        toast.error('CEP não encontrado. Por favor, verifique o CEP informado.');
      }
    }
  };
  
  const nextStep = () => {
    if (formStep === 0) {
      // Validate personal information fields
      const personalFields = ['nome', 'dataNascimento', 'nomeMae', 'rg', 'cpf'];
      const hasErrors = personalFields.some(field => !!errors[field] || !values[field as keyof PersonFormData]);
      
      if (hasErrors) {
        personalFields.forEach(field => {
          if (!values[field as keyof PersonFormData]) {
            setFieldValue(field as keyof PersonFormData, '');
          }
        });
        toast.error('Por favor, preencha todos os campos obrigatórios corretamente.');
        return;
      }
    }
    
    if (formStep === 1) {
      // Validate address fields
      const addressFields = ['cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'];
      const hasErrors = addressFields.some(field => !!errors[field] || !values[field as keyof PersonFormData]);
      
      if (hasErrors) {
        addressFields.forEach(field => {
          if (!values[field as keyof PersonFormData]) {
            setFieldValue(field as keyof PersonFormData, '');
          }
        });
        toast.error('Por favor, preencha todos os campos obrigatórios corretamente.');
        return;
      }
    }
    
    setFormStep(curr => curr + 1);
  };
  
  const prevStep = () => {
    setFormStep(curr => curr - 1);
  };
  
  if (isSubmitSuccess) {
    return (
      <div className="form-container">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="success-checkmark">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-medium">Cadastro Realizado</h2>
          <p className="mt-2 text-muted-foreground">
            Seus dados foram cadastrados com sucesso.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="form-container">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">Cadastro de Pessoa</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para realizar o cadastro.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  formStep >= index
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
              {index < 2 && (
                <div
                  className={`h-1 w-full flex-1 mx-2 transition-colors ${
                    formStep > index ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className={formStep >= 0 ? 'text-foreground font-medium' : ''}>
            Dados Pessoais
          </span>
          <span className={formStep >= 1 ? 'text-foreground font-medium' : ''}>
            Endereço
          </span>
          <span className={formStep >= 2 ? 'text-foreground font-medium' : ''}>
            Contato
          </span>
        </div>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
        {formStep === 0 && (
          <FormSection
            title="Dados Pessoais"
            description="Informe seus dados pessoais para identificação"
          >
            <FormField
              id="nome"
              name="nome"
              label="Nome Completo"
              value={values.nome}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nome}
              touched={touched.nome}
              placeholder="Digite seu nome completo"
              autoComplete="name"
              className="md:col-span-2"
            />
            
            <FormField
              id="dataNascimento"
              name="dataNascimento"
              label="Data de Nascimento"
              value={values.dataNascimento}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.dataNascimento}
              touched={touched.dataNascimento}
              type="date"
              placeholder="DD/MM/AAAA"
            />
            
            <FormField
              id="nomeMae"
              name="nomeMae"
              label="Nome da Mãe"
              value={values.nomeMae}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nomeMae}
              touched={touched.nomeMae}
              placeholder="Digite o nome da mãe"
            />
            
            <FormField
              id="rg"
              name="rg"
              label="RG"
              value={values.rg}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.rg}
              touched={touched.rg}
              placeholder="00.000.000-0"
              mask
              maxLength={12}
            />
            
            <FormField
              id="cpf"
              name="cpf"
              label="CPF"
              value={values.cpf}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.cpf}
              touched={touched.cpf}
              placeholder="000.000.000-00"
              mask
              maxLength={14}
            />
          </FormSection>
        )}
        
        {formStep === 1 && (
          <FormSection
            title="Endereço"
            description="Informe seu endereço completo"
          >
            <div className="md:col-span-2 relative">
              <FormField
                id="cep"
                name="cep"
                label="CEP"
                value={values.cep}
                onChange={handleChange}
                onBlur={handleCepBlur}
                error={errors.cep}
                touched={touched.cep}
                placeholder="00000-000"
                mask
                maxLength={9}
                className="max-w-[12rem]"
              />
              {isLoadingAddress && (
                <div className="absolute right-0 top-0 mt-8 mr-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            
            <FormField
              id="logradouro"
              name="logradouro"
              label="Logradouro"
              value={values.logradouro}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.logradouro}
              touched={touched.logradouro}
              placeholder="Rua, Avenida, etc."
              className="md:col-span-2"
            />
            
            <FormField
              id="numero"
              name="numero"
              label="Número"
              value={values.numero}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.numero}
              touched={touched.numero}
              placeholder="123"
            />
            
            <FormField
              id="complemento"
              name="complemento"
              label="Complemento"
              value={values.complemento}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.complemento}
              touched={touched.complemento}
              placeholder="Apto, Bloco, etc."
              required={false}
            />
            
            <FormField
              id="bairro"
              name="bairro"
              label="Bairro"
              value={values.bairro}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.bairro}
              touched={touched.bairro}
              placeholder="Digite o bairro"
            />
            
            <FormField
              id="cidade"
              name="cidade"
              label="Cidade"
              value={values.cidade}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.cidade}
              touched={touched.cidade}
              placeholder="Digite a cidade"
            />
            
            <FormField
              id="estado"
              name="estado"
              label="Estado"
              value={values.estado}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.estado}
              touched={touched.estado}
              placeholder="UF"
              maxLength={2}
            />
          </FormSection>
        )}
        
        {formStep === 2 && (
          <FormSection
            title="Contato"
            description="Informe seus dados de contato"
          >
            <FormField
              id="telefone"
              name="telefone"
              label="Telefone com DDD"
              value={values.telefone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.telefone}
              touched={touched.telefone}
              placeholder="(00) 00000-0000"
              mask
              maxLength={15}
            />
            
            <FormField
              id="email"
              name="email"
              label="E-mail"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              type="email"
              placeholder="exemplo@email.com"
            />
          </FormSection>
        )}
        
        <div className="flex justify-between mt-8">
          {formStep > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2 transition-all hover:translate-x-[-2px]"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </Button>
          ) : (
            <div></div>
          )}
          
          {formStep < 2 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 transition-all hover:translate-x-[2px]"
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Finalizar Cadastro
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
