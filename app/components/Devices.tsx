"use client"

import React, { useContext, useState } from 'react';
import { DevicesContext } from './DevicesProvider';

interface Currency {
  id: number;
  name: string;
  symbol: string;
  country: string;
}

interface DevicesProps {
  className?: string;
}

const Devices = ({ className }: DevicesProps) => {
  const { currentSymbol, setCurrentSymbol } = useContext(DevicesContext);
  const [currencies, setCurrencies] = useState<Currency[]>([
    { id: 1, name: 'USD', symbol: '$', country: 'États-Unis ou Canada' },
    { id: 2, name: 'EUR', symbol: '€', country: 'Europe' },
    { id: 4, name: 'GBP', symbol: '£', country: 'Royaume-Uni' },
    { id: 5, name: 'AUD', symbol: 'AU$', country: 'Australie' },
    { id: 6, name: 'XAF', symbol: 'FCFA', country: 'Afrique centrale' },
  ]);

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrencyId = event.target.value;
    const currency = currencies.find((currency) => currency.name === selectedCurrencyId);
    setSelectedCurrency(currency?.name ?? null);
    setCurrentSymbol(currency?.symbol ?? '');
  };

  return (
    <div className={className}>
      <select value={selectedCurrency ?? ''} onChange={handleCurrencyChange} className='w-full h-full'>
        <option value="">Devise</option>
        {currencies.map((currency) => (
          <option key={currency.id} value={currency.name}>
            {currency.name} ({currency.country}) - {currency.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Devices;
