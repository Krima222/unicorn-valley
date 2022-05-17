import './courseList.scss';

const CourseList = ({courses}) => {
    return (
        <ul className="course-list">
            {courses.map((item, i) => {
                return (
                    <li key={i} className="course-list__item">
                        <a href={item.link} className="course-list__link">
                            <img className="course-list__img" src={item.thumbnail} alt={item.title}/>
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

export default CourseList;
