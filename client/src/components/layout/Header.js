import { ReactNavbar } from 'overlay-navbar'
import logo from '../../images/logo.png'
import { BiSearchAlt } from 'react-icons/bi'

const Header = () => {
    return (
        <>
        <ReactNavbar
        navColor1="#d6d6d6"
        logo={logo}
        logoWidth="100px"
        logoHoverSize="20px"
        logoHoverColor="blue"
        nav2justifyContent="space-around"
        nav3justifyContent="space-around"
        SearchIconElement={BiSearchAlt}
        searchIcon={true}
        cartIconSize="2rem"
        />
        </>
    )
}

export default Header