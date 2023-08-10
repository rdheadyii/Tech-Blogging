// import needed variables
const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// get all blogs and join them with user
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        // serialize data to be read by template
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // pass in serialized data from above with session flag into template
        res.render('homepage', { 
            blogs, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one blog by id
router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [User]
                },
            ],
        });

        // serialize data to be read by template
        const blog = blogData.get({ plain: true });

        // pass in serialized data from above with session flag into template
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// withAuth middleware prevents access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // find logged in user based on session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        // serialize data to be read by template
        const user = userData.get({ plain: true });

        // pass in serialized data from above with session flag into template
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get for login
router.get('/login', (req, res) => {
    // redirect if user is logged in
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    // render login
    res.render('login')
});

// get for sign up
router.get('/signUp', (req, res) => {
    // redirect if user is logged in
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    // render signUp
    res.render('signUp')
});

// export out routes
module.exports = router;