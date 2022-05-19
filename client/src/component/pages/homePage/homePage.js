import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

    return (
        <>
            <Header/>
            <div className="homepage">
                <div className="homepage-container">
                    <UserInfo/>
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
