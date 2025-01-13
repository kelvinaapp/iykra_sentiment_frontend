import React, { createContext, useState, useContext } from 'react';

export const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [selectedBrand, setSelectedBrand] = useState('Adidas');

  return (
    <BrandContext.Provider value={{ selectedBrand, setSelectedBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
