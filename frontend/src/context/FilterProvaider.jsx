import filter from 'leo-profanity';
import { createContext, useCallback } from 'react';

export const FilterContext = createContext({});

const FilterProvider = ({ children }) => {
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const filterWord = useCallback((word) => filter.clean(word), []);

  return <FilterContext.Provider value={filterWord}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
