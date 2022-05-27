import Avatars from '../models/avatars.js';

export const getAvatars = async (req, res) => {
    const avatars = await Avatars.find({});
    res.send(JSON.stringify(avatars));
}

export const postAvatar = (req, res) => {
    new Avatars({
        src: req.body.src,
        alt: req.body.alt
    }).save();
    res.send(JSON.stringify({message: 'Новая ссылка на картинку успешно сохранена'}))
}

export const deleteAvatars = (req, res) => {
    Avatars.remove({}, () => {
        res.send(JSON.stringify({message: 'Все аватары удалены'}))
    });
}
