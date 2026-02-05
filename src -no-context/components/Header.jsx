import ReactLogo from '../assets/React-Logo.png'

const Header = () => {
  return (
    <header className='app-header'>
      <img
        src={ReactLogo}
        alt='React logo'
        style={{ width: '50px', height: '50px' }}
      />
      <h1>The React Quiz</h1>
    </header>
  )
}

export default Header
