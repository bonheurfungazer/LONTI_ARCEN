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
  const [currencies] = useState<Currency[]>([
    { id: 1, name: 'USD', symbol: '$', country: 'États-Unis ou Canada' },
    { id: 2, name: 'EUR', symbol: '€', country: 'Europe' },
    { id: 4, name: 'GBP', symbol: '£', country: 'Royaume-Uni' },
    { id: 5, name: 'AUD', symbol: 'AU$', country: 'Australie' },
    { id: 6, name: 'XAF', symbol: 'FCFA', country: 'Afrique centrale' },
  ]);

  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency.name);
    setCurrentSymbol(currency.symbol);
    // Blur to close the dropdown
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className={className || "btn"}>
        {selectedCurrency ? `${selectedCurrency} ` : "Devise"}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {currencies.map((currency) => (
          <li key={currency.id}>
            <button onClick={() => handleCurrencySelect(currency)}>
              {currency.name} {currency.symbol}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Devices;
