import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from '../../header/header';
import UserInfo from '../../userInfo/userInfo';
import ProfileField from '../../profileField/profileField';
import CourseList from '../../courseList/courseList';
import ProfileSettings from '../../profileSettings/profileSettings'

import './homePage.scss';

const Homepage = () => {
    const [courses, setCourses] = useState([]);
    const [userData, setUserData] = useState({});
    const [game, setGame] = useState({});
    const [{token}] = useCookies(['token']);
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const getData = async (token) => {
        const res = await fetch('http://localhost:5000/userInfo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const {nickname, game, avatar, message} = await res.json()
        if (!res.ok) {
            return console.log(message)
        }
        setUserData({nickname, avatar})
        setGame(game)
    }

    const getStatic = async (type, setState) => {
        const res = await fetch(`http://localhost:5000/${type}`)
        const data = await res.json()
        if (!res.ok) {
            return console.log(data.message)
        }
        setState(data)
    }

    useEffect(() => {
        getData(token)
        getStatic('avatars', setAvatars)
        getStatic('courses', setCourses)
    }, [])

    useEffect(() => {
        if (selectedAvatar) {
            setUserData(userData => ({
                ...userData, avatar: selectedAvatar
            }))
        }
    }, [selectedAvatar])

    return (
        <>
            <Header/>
            <div className="homepage">
                <div className="homepage-container">
                    <UserInfo userData={userData}/>
                    <ProfileField>
                        <Routes>
                            <Route path='courses' element={<CourseList courses={courses}/>}/>
                            <Route path='settings' element={<ProfileSettings
                                                                avatars={avatars}
                                                                selectedAvatar={selectedAvatar}
                                                                setSelectedAvatar={setSelectedAvatar}
                                                                token={token}/>
                                                            }
                            />
                        </Routes>
                    </ProfileField>
                </div>
            </div>
        </>
    )
}

export default Homepage;
