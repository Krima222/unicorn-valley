import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Header from '../../header/header';
import UserInfo from '../../userInfo/userInfo';
import ProfileField from '../../profileField/profileField';
import CourseList from '../../courseList/courseList';
import ProfileSettings from '../../profileSettings/profileSettings'


import './homePage.scss';

import img from '../../imgs/js-react.jpg'

const Homepage = () => {

    const [courses, setCourses] = useState([
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'},
        {title: 'js-react-course', thumbnail: img, link: 'https://www.udemy.com/course/javascript_full/'}
    ]);
    const [nickname, setNickname] = useState('')
    const [game, setGame] = useState({})
    const [{token}] = useCookies(['token']);

    const getData = async (token) => {
        const res = await fetch('http://localhost:5000/userInfo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const {nickname, game, message} = await res.json()
        if (!res.ok) {
            return console.log(message)
        }
        setNickname(nickname)
        setGame(game)
    }

    useEffect(() => {
        getData(token);
    }, [])

    return (
        <>
            <Header/>
            <div className="homepage">
                <div className="homepage-container">
                    <UserInfo nickname={nickname}/>
                    <ProfileField>
                        <Routes>
                            <Route path='courses' element={<CourseList courses={courses}/>}/>
                            <Route path='settings' element={<ProfileSettings/>}/>
                        </Routes>
                    </ProfileField>
                </div>
            </div>
        </>
    )
}

export default Homepage;
