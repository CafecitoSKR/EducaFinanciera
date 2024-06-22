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
    author: Joi.string().required()
});

// Crear un nuevo post
router.post('/', verify, upload.fields([{ name: 'images' }, { name: 'videos' }]), async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const { title, content, author } = req.body;
    
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

// Otras rutas permanecen igual...

module.exports = router;

