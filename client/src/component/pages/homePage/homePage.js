import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Header from '../../header/header'
import UserInfo from '../../userInfo/userInfo'
import ProfileField from '../../profileField/profileField'
import CourseList from '../../courseList/courseList'
import ProfileSettings from '../../profileSettings/profileSettings'
import TrajectoryPuzzle from '../../trajectoryPuzzle/trajectoryPuzzle'


import './homePage.scss';


const Homepage = () => {
    const [courses, setCourses] = useState([]);
    const [userData, setUserData] = useState({});
    const [game, setGame] = useState({});
    const [{token}] = useCookies(['token']);
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [puzzles, setPuzzles] = useState([])
    const [newNickname, setNewNickname] = useState(null);
    const [selectedPuzzle, setSelectedPuzzle] = useState({})

    const getData = async (token) => {
        const res = await fetch('http://localhost:5000/userInfo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const {nickname, game, avatar, message, puzzles} = await res.json()
        if (!res.ok) {
            return console.log(message)
        }
        setUserData({nickname, avatar})
        setGame(game)
        return puzzles
    }

    const mergePuzzles = (publicPuzzles, userPuzzles) => {
        publicPuzzles.forEach(puzzle => {
            const puzzleBox = userPuzzles.find(({name}) => name === puzzle.name)
            puzzle.puzzle.forEach(item => {
                const puzzlePiece = puzzleBox.puzzle.find(({name}) => name === item.name)
                item.counted = puzzlePiece.counted
            })
        });
        return publicPuzzles
    }

    const getPuzzles = async (userPuzzles) => {
        const res = await fetch('http://localhost:5000/puzzles')
        const data = await res.json()
        if (!res.ok) {
            return console.log(data.message)
        }
        const puzzles = mergePuzzles(data, userPuzzles)
        setPuzzles(puzzles)
        setSelectedPuzzle(puzzles[0])
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
        if (newNickname === null) {
            getData(token).then(getPuzzles)
        }
        getStatic('avatars', setAvatars)
        getStatic('courses', setCourses)
    }, [newNickname])

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
                    <UserInfo
                        userData={userData}
                        newNickname={newNickname}
                        setNewNickname={setNewNickname}
                        puzzles={puzzles}
                        setSelectedPuzzle={setSelectedPuzzle}/>
                    <ProfileField>
                        <Routes>
                            <Route path='courses' element={<CourseList courses={courses}/>}/>
                            <Route path='settings' element={<ProfileSettings
                                                                avatars={avatars}
                                                                selectedAvatar={selectedAvatar}
                                                                setSelectedAvatar={setSelectedAvatar}
                                                                newNickname={newNickname}
                                                                setNewNickname={setNewNickname}
                                                                token={token}/>
                                                            }
                            />
                            <Route path='puzzle' element={<TrajectoryPuzzle puzzle={selectedPuzzle}/>}/>
                        </Routes>
                    </ProfileField>
                </div>
            </div>
        </>
    )
}

export default Homepage;
