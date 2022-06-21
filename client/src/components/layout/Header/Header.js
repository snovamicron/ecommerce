import { ReactNavbar } from 'overlay-navbar'
import logo from '../../../images/logo.png'
import { BiSearchAlt } from 'react-icons/bi'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'

const Header = () => {
    return (
        <>
        <ReactNavbar
        burgerColorHover="blue"
        navColor1="#6eff6a"
        logo={logo}
        logoHoverSize="20px"
        logoHoverColor="blue"
        nav2justifyContent="space-around"
        nav3justifyContent="space-around"
        link1Text="Home"
        link2Text="Products"
        link3Text="Contact"
        link4Text="About"
        link1Url="/home"
        link2Url="/products"
        link3Url="/about"
        link4Url="/content"
        link1Size="1.7rem"
        link2Size="1.7rem"
        link3Size="1.7rem"
        link4Size="1.7rem"
        link1ColorHover="blue"
        link2ColorHover="blue"
        link3ColorHover="blue"
        link4ColorHover="blue"
        SearchIconElement={BiSearchAlt}
        searchIcon={true}
        searchIconSize="2rem"
        searchIconColor="black"
        searchIconUrl="/search"
        cartIcon={true}
        CartIconElement={BsFillCartPlusFill}
        cartIconSize="2rem"
        cartIconColor="black"
        cartIconMargin="5px"
        cartIconUrl="/cart"
        profileIcon={true}
        ProfileIconElement={CgProfile}
        profileIconSize="2rem"
        profileIconColor="black"
        profileIconUrl="/profile"
        searchIconColorHover="blue"
        cartIconColorHover="blue"
        profileIconColorHover="blue"
        />
        </>
    )
}

export default Header