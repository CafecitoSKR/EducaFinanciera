const router = require('express').Router();
const Post = require('../models/Posts');
const Joi = require('@hapi/joi');
const multer = require('multer');
const verify = require('./validate-token');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Schema de validación con Joi
const schemaPost = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().required(),  // Author es obligatorio
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
router.post('/', verify, upload.fields([{ name: 'images' }, { name: 'videos' }]), async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    console.log('Authenticated user ID:', req.user.id); // Verificar el ID del usuario autenticado
    console.log('Authenticated user name:', req.user.name); // Verificar el nombre del usuario autenticado

    const { title, content } = req.body;
    const author = req.user.name;  // Obtenemos el nombre del usuario autenticado

    // Validar los datos del post
    const { error } = schemaPost.validate({ title, content, author });
    if (error) {
        console.log('Validation error:', error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const images = req.files.images ? req.files.images.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        })) : [];

        const videos = req.files.videos ? req.files.videos.map(file => ({
            data: file.buffer,
            contentType: file.mimetype
        })) : [];

        const post = new Post({
            title,
            content,
            author,
            images,
            videos
        });

        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        console.log('Error saving post:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Obtener todos los posts, solo para usuarios autenticados
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;