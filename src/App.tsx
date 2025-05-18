import Header from '@/components/Header';
import Main from '@/components/Main';
import '@/styles/components/App.scss';
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const dark: boolean = true;
  return (
    <div className={`App-${dark ? 'dark' : ''}`}>
      <Header/>
      <Main/>
    </div>
  )
}

export default App
