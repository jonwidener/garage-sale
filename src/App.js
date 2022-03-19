import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inventory from './pages/Inventory';
import Accounts from './pages/Accounts';
import NotFound from './pages/NotFound';
import { DataProvider } from './context/DataContext';
import DrawerContents from './components/DrawerContents';
import AddItems from './components/AddItems';
import Dashboard from './pages/Dashboard';
import AddAccount from './components/AddAccount';
import Cashier from './pages/Cashier';
import Sales from './pages/Sales';

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className='h-screen drawer w-full rounded'>
          <input id='my-drawer' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content'>
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Routes>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='/inventory' element={<Inventory />}></Route>
                <Route path='/accounts' element={<Accounts />}></Route>
                <Route path='/sales' element={<Sales />}></Route>
                <Route path='/cashier' element={<Cashier />}></Route>
                <Route path='/addaccount' element={<AddAccount />}></Route>
                <Route path='/additems' element={<AddItems />}></Route>
                <Route path='/notfound' element={<NotFound />}></Route>
                <Route path='/*' element={<NotFound />}></Route>
              </Routes>
            </main>
          </div>
          <div className='drawer-side'>
            <label htmlFor='my-drawer' className='drawer-overlay'></label>
            <DrawerContents />
          </div>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
