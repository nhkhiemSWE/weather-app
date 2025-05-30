import Header from '@/components/Header';
import Main from '@/components/Main';
import '@/styles/components/App.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useTheme } from '@/context/theme_provider';

const App = () => {
  const {theme, setTheme}  = useTheme();
  return (
    <div className={`App-${theme}`}>
      <Header/>
      <Main/>
    </div>
  )
}

export default App
