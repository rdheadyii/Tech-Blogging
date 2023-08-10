// import needed variables
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get comments
router.get('/', async (req, res) => {
    try{
        const commentData = Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
});
// get comment by id
router.get('/:id', async (req, res) => {
    try{
        const commentData = Comment.findByPk(req.params.id);

        if(!commentData) {
            res.status(404).json({message: 'No comment with this id!'});
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
});

// post comment
router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: '404 Blog ID not found' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// export comment route
module.exports = router;