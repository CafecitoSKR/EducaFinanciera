<template>
  <div class="posts">
    <h2>Create a New Post</h2>
    <form @submit.prevent="createPost" enctype="multipart/form-data">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="post.title" required>
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea v-model="post.content" required></textarea>
      </div>
      <div>
        <label for="images">Images:</label>
        <input type="file" @change="handleImages" multiple>
      </div>
      <div>
        <label for="videos">Videos:</label>
        <input type="file" @change="handleVideos" multiple>
      </div>
      <button type="submit">Create Post</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { getToken } from '@/auth';

export default {
  name: 'PostsComponent',
  data() {
    return {
      post: {
        title: '',
        content: '',
        author: '', // Asegúrate de establecer esto al ID del usuario autenticado
        images: [],
        videos: []
      }
    };
  },
  mounted() {
    // Asume que tienes una función para obtener el ID del usuario
    this.post.author = this.getAuthenticatedUserId();
  },
  methods: {
    handleImages(event) {
      console.log('Selected images:', event.target.files);
      this.post.images = event.target.files;
    },
    handleVideos(event) {
      console.log('Selected videos:', event.target.files);
      this.post.videos = event.target.files;
    },
    async createPost() {
      try {
        const token = getToken();
        const formData = new FormData();
        formData.append('title', this.post.title);
        formData.append('content', this.post.content);
        formData.append('author', this.post.author); // Utiliza el ID del usuario autenticado

        for (let i = 0; i < this.post.images.length; i++) {
          formData.append('images', this.post.images[i]);
        }

        for (let i = 0; i < this.post.videos.length; i++) {
          formData.append('videos', this.post.videos[i]);
        }

        console.log('Form data:', formData);

        const response = await axios.post('http://localhost:3000/posts', formData, {
          headers: {
            'auth-token': token,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
        alert('Post created successfully!');
        // Reset the form
        this.post.title = '';
        this.post.content = '';
        this.post.images = [];
        this.post.videos = [];
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post: ' + (error.response?.data?.message || error.message));
      }
    },
    getAuthenticatedUserId() {
      // Implementa esta función para obtener el ID del usuario autenticado
      // Puede ser desde el almacenamiento local, Vuex, o cualquier otra fuente
      return localStorage.getItem('userId') || 'USER_ID';
    }
  }
}
</script>

<style scoped>
.posts {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.posts div {
  margin-bottom: 10px;
}
.posts label {
  display: block;
  margin-bottom: 5px;
}
.posts input,
.posts textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.posts button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
