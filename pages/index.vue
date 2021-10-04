<template>
<div>
  <!-- Header Nav -->
  <ul>
    <li><n-link to="/users">Users</n-link></li>
    <li v-if="!user"><n-link to="accounts/login">Sign In</n-link></li>
    <li v-if="!user"><n-link to="accounts/signup">Sign Up</n-link></li>
    <li v-if="user"><n-link to="accounts/settings">Settings</n-link></li>
    <li v-if="user"><button @click="$auth.signOut();">Sign Out</button></li>
  </ul>

  <!-- Head -->
  <h1>
    <div>{{user ? user.identifier : "Let's Sign In"}}</div>
  </h1>

  <!-- Profile -->
  <p>
    {{user && user.profile}}
  </p>

  <!-- Realod Posts Button -->
  <button @click="$nuxt.refresh">Reload posts</button>

  <!-- Posts -->
  <Posts @deletePost="modal=true; deleteId = $event;" :posts=posts display-username />

  <!-- Post Form -->
  <PostForm />

  <!-- Modal -->
  <div v-if="modal" @click.self="modal=false;" class="modal">
    <div class="modal-content">
      <strong>Really you want to delete this post?</strong>
      <Post style="margin: 1rem 0;" :post="posts.find(post => post._id === deleteId)" />
      <div>
        <button @click="modal=false;">Cancel</button>
        <button @click="modal=false; deletePost(deleteId)">OK</button>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.3);
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90vw;
  max-width: 640px;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
  background: white;
}
</style>

<script>
export default {
  data() {
    return {
      modal: false,
      deleteId: null,
    }
  },
  async asyncData({$posts}) {
    return {
      posts: await $posts.getAllPosts()
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    deletePost(_id) {
      this.$posts.deletePost(_id)
      this.$nuxt.refresh()
    }
  },
  head() {
    return {
      title: "Home",
      bodyAttrs: {
        style: `overflow: ${this.modal ? 'hidden': ''}`
      }
    }
  }
}
</script>