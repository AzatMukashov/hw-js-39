import './App.css'
import SearchBar from './components/SearchBar/SearchBar.tsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ShowDetails from './components/ShowDetails/ShowDetails.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const App = () => {
  return (
    <Provider store={store}>
      <Router future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <div>
          <SearchBar/>
          <Routes>
            <Route path="/shows/:id" element={<ShowDetails/>}/>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App
