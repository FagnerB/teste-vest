"use client"

import { useState } from 'react';
import { DeliveryAddress } from '@/types/cart';

interface CEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const useCEP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddressByCEP = async (cep: string): Promise<Partial<DeliveryAddress> | null> => {
    setLoading(true);
    setError(null);

    try {
      // Remove any non-numeric characters
      const cleanCEP = cep.replace(/\D/g, '');
      
      if (cleanCEP.length !== 8) {
        throw new Error('CEP deve conter 8 dígitos');
      }

      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      
      if (!response.ok) {
        throw new Error('Erro ao consultar CEP');
      }

      const data: CEPResponse = await response.json();

      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        cep: data.cep,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const formatCEP = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 8) {
      return cleanValue.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return cleanValue.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return {
    fetchAddressByCEP,
    formatCEP,
    loading,
    error,
  };
};