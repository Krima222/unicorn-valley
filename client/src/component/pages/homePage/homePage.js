import './homePage.scss'
import Header from "../../header/header"
import UserInfo from "../../userInfo/userInfo";
import ProfileField from "../../profileField/profileField";

const Homepage = () => {
    return (
        <>
            <Header/>
            <div className="homepage">
                <div className="homepage-container">
                    <UserInfo/>
                    <ProfileField className="profile-field"/>
                </div>
            </div>
        </>
    )
}

export default Homepage;
