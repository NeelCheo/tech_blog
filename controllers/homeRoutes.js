const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in,
      scripts: ['home'] 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id',withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      scripts: ['comment'] 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/post/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('editpost', {
      post,
      logged_in: req.session.logged_in,
      scripts: ['editpost']
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post,
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ], }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
      scripts: ['dashboard']
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', {
    scripts: ['login']
  });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/'); 
    return;
  }
  res.render('signup', { 
    scripts: ['signup']
  });
});


router.get('/newpost', withAuth, (req, res) => {
  res.render('newpost', {
    logged_in: req.session.logged_in,
    scripts: ['newpost'] 
  });
});

module.exports = router;