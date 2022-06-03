// CSS
import "./footer.css"

// images
import playStore from "../../../images/playStore.png"
import appStore from "../../../images/appStore.png"
import facebook from "../../../images/facebook.png"
import instagram from "../../../images/instagram.png"
import twitter from "../../../images/twitter.png"


const Footer = () => {
    return (
        <footer id="footer">
            <div id="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android an IOS mobile phone</p>
                <div>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="appStore" />
                </div>
            </div>

            <div id="midFooter">
                <h1>D-COMMERCE</h1>
                <p>High quality is our first priority</p>
                <p>Copyrights 2022 &copy; novaDeveloper</p>
            </div>
            
            <div id="rightFooter">
                <h4>FOLLOW US</h4>
                <div>
                <a href="https://www.facebook.com" rel="noreferrer" target="_blank"><img src={facebook} alt="facebook" /></a>
                <a href="https://www.instagram.com" rel="noreferrer" target="_blank"><img src={instagram} alt="instagram" /></a>
                <a href="https://www.twitter.com" rel="noreferrer" target="_blank"><img src={twitter} alt="twitter" /></a>
                </div>
            </div>

        </footer>
    )
}


export default Footer