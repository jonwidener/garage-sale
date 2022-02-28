import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import ControlUnitModel from '../models/ControlUnit.model';
import ItemModel from '../models/Item.model';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useLocalStorage('garage-sale-data', {
    controlUnits: [],
    items: [],
    accounts: [],
  });

  const loadData = (rawData) => {
    const jsonData = JSON.parse(rawData);
    console.log(jsonData);
    const newData = {
      controlUnits: jsonData.controlUnits.map(
        (cu) => new ControlUnitModel({ ...cu })
      ),
      items: jsonData.items.map((item) => new ItemModel({ ...item })),
      accounts: jsonData.accounts.map((account) => account),
    };
    console.log(newData);
    setData(newData);
  };

  //const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loadData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
