
import React from 'react';
import PersonForm from '@/components/PersonForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
            Sistema de Cadastro de Pessoas
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Registre informações pessoais de forma simples e elegante com nosso formulário de cadastro intuitivo.
          </p>
        </div>
        
        <PersonForm />
        
        <div className="mt-12 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Sistema de Cadastro • Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
