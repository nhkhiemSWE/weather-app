import '@/styles/components/Header.scss';
import Place from '@/components/Place';
import Search from '@/components/Search';
import Settings from '@/components/Settings';

const Header = () => {
  return (
    <div className = "Header"> 
      <Place/>
      <Search/>
      <Settings/>
    </div>

  )
}

export default Header