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
  <Posts @deletePost="deletePost" :posts=posts display-username />

  <!-- Post Form -->
  <PostForm />

</div>
</template>

<script>
export default {
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