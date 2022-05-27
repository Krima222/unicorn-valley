import Courses from '../models/courses.js';

export const getCourses = async (req, res) => {
    const courses = await Courses.find({});
    res.send(JSON.stringify(courses));
}

export const postCourses = (req, res) => {
    new Courses({
        title: req.body.title,
        thumbnail: req.body.thumbnail,
        link: req.body.link
    }).save();
    res.send(JSON.stringify({message: 'Новая ссылка на курс успешно сохранена'}))
}

export const deleteCourses = (req, res) => {
    Courses.remove({}, () => {
        res.send(JSON.stringify({message: 'Все курсы удалены'}))
    });
}
