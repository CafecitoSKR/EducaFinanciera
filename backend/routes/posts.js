const router = require('express').Router();
const Post = require('../models/Posts');  // Verifica que la ruta es correcta
const Joi = require('@hapi/joi');
const verify = require('./validate-token');

// Schema de validación con Joi
const schemaPost = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().required(),
    images: Joi.array().items(Joi.object({
        data: Joi.binary().required(),
        contentType: Joi.string().required()
    })).optional(),
    videos: Joi.array().items(Joi.object({
        data: Joi.binary().required(),
        contentType: Joi.string().required()
    })).optional()
});

// Crear un nuevo post
router.post('/', verify, async (req, res) => {
    const { error } = schemaPost.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const post = new Post(req.body);  // Crear instancia del modelo Post
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener todos los posts
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un post por ID
router.get('/:id', verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        if (post == null) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Actualizar un post
router.patch('/:id', verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (req.body.title != null) {
            post.title = req.body.title;
        }
        if (req.body.content != null) {
            post.content = req.body.content;
        }
        if (req.body.images != null) {
            post.images = req.body.images;
        }
        if (req.body.videos != null) {
            post.videos = req.body.videos;
        }

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un post
router.delete('/:id', verify, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await post.remove();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;