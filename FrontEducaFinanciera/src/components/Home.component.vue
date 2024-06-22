<template>
  <div class="posts">
    <h2>All Posts</h2>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="post in posts" :key="post._id" class="post-card">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
        <p><strong>Author:</strong> {{ post.author }}</p>
        <div v-if="post.images.length">
          <h4>Images</h4>
          <div class="media">
            <img v-for="(image, index) in post.images" :key="index" :src="getImageSrc(image)" alt="Post Image">
          </div>
        </div>
        <div v-if="post.videos.length">
          <h4>Videos</h4>
          <div class="media">
            <video v-for="(video, index) in post.videos" :key="index" controls :src="getVideoSrc(video)"></video>
          </div>
        </div>
        <div class="post-actions">
          <button @click="likePost(post._id)">Like</button>
          <button @click="commentPost(post._id)">Comment</button>
          <button @click="sharePost(post._id)">Share</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getToken } from '@/auth';

export default {
  name: 'HomeComponent',
  data() {
    return {
      posts: [],
      error: null
    };
  },
  async created() {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:3000/posts', {
        headers: {
          'auth-token': token
        }
      });
      this.posts = response.data;
    } catch (error) {
      this.error = 'Failed to load posts';
      console.error('Error loading posts:', error);
    }
  },
  methods: {
    getImageSrc(image) {
      const base64String = btoa(String.fromCharCode(...new Uint8Array(image.data.data)));
      return `data:${image.contentType};base64,${base64String}`;
    },
    getVideoSrc(video) {
      const binary = new Uint8Array(video.data.data);
      const base64String = btoa(String.fromCharCode.apply(null, binary));
      return `data:${video.contentType};base64,${base64String}`;
    },
    likePost(postId) {
      // Acción de like (solo visual por ahora)
      alert(`Liked post ${postId}`);
    },
    commentPost(postId) {
      // Acción de comentar (solo visual por ahora)
      alert(`Comment on post ${postId}`);
    },
    sharePost(postId) {
      // Acción de compartir (solo visual por ahora)
      alert(`Share post ${postId}`);
    }
  }
};
</script>

<style scoped>
.posts {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.error {
  color: red;
}
.post-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.media {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.media img, .media video {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
.post-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.post-actions button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.post-actions button:hover {
  background-color: #0056b3;
}
</style>
