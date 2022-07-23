import React, { useState, createContext } from 'react';

export const SetAccesstoken = createContext();
export const Accesstoken = createContext();
export default function AccesstokenState({ children }) {
  const [accesstoken, setAccesstoken] = useState('');
  return (
    <SetAccesstoken.Provider value={setAccesstoken}>
      <Accesstoken.Provider value={accesstoken}>
        {children}
      </Accesstoken.Provider>
    </SetAccesstoken.Provider>
  );
}
