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
  <Posts @deletePost="dialog=true; $store.commit('setScroll', false)" :posts=posts display-username />

  <!-- Post Form -->
  <PostForm />

  <div v-if="dialog" @click.self="dialog=false; $store.commit('setScroll', true)" class="dialog">
    <div class="dialog-content">
      <strong>Really you want to delete the post?</strong>
      <div>
        <button @click="dialog=false; $store.commit('setScroll', true)">Cancel</button>
        <button @click="dialog=false; $store.commit('setScroll', true)">OK</button>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.2);
}
.dialog-content {
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
      dialog: false
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
  }
}
</script>