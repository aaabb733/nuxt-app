<template>
<div>

  <!-- header nav -->
  <ul>
    <li><n-link to="/users">Users</n-link></li>
    <li v-if="!$store.state.user"><n-link to="accounts/login">Sign In</n-link></li>
    <li v-if="!$store.state.user"><n-link to="accounts/signup">Sign Up</n-link></li>
    <li v-if="$store.state.user"><n-link to="accounts/settings">Settings</n-link></li>
    <li v-if="$store.state.user"><button @click="$auth.signOut();">Sign Out</button></li>
  </ul>

  <!-- head -->
  <h1>
    <div>{{$store.state.user ? $store.state.user.identifier : "Let's Sign In"}}</div>
  </h1>

  <!-- profile -->
  <p>
    {{$store.state.user && $store.state.user.profile}}
  </p>

  <!-- reload posts button -->
  <button @click="$nuxt.refresh">Reload posts</button>

  <!-- posts list -->
  <ul v-if="posts.length > 0">
    <li v-for="post in posts" :key="post._id">
      <n-link :to="`/${post.author}`">{{post.author}}</n-link>
      <span>[{{post.date.toLocaleString()}}]</span>
      <button @click="deletePost(post._id)" v-if="$store.state.user && $store.state.user.identifier === post.author">Delete</button>
      <p style="word-break: break-all;">{{post.content}}</p>
    </li>
  </ul>
  <div v-else>there are no posts</div>

  <!-- post form -->
  <form v-if="$store.state.user" @submit.prevent="post">
    <div>
      <label style="font-weight: bold;" for="input-content">Post content</label>
    </div>
    <div>
      <textarea style="width: 100%; max-width: 40rem;" v-model="content" @keydown.ctrl.enter="post" name="content" id="input-content" rows="10"></textarea>
    </div>
    <button type="submit">Post</button>
  </form>

</div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
</style>

<script>
export default {
  data() {
    return {
      content: ""
    }
  },
  async asyncData({$db}) {
    return {
      posts: await $db.collection("posts").find({}, {}).sort({date: -1}).toArray()
    }
  },
  methods: {
    deletePost(_id) {
      this.$posts.deletePost(_id)
      this.$nuxt.refresh()
    },
    async post() {
      if (this.content !== "") {
        await this.$db.collection("posts").insert({author: this.$store.state.user.identifier, content: this.content, date: new Date()})
        this.$nuxt.refresh()
        this.content = ""
      }
    },
  }
}
</script>