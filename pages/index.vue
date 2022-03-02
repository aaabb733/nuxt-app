<template>
<div>
  <!-- Header Nav -->
  <ul>
    <li><n-link to="/users">ユーザー</n-link></li>
    <li v-if="!user"><n-link to="accounts/login">ログイン</n-link></li>
    <li v-if="!user"><n-link to="accounts/signup">アカウントを作成</n-link></li>
    <li v-if="user"><n-link to="accounts/settings">設定</n-link></li>
    <li v-if="user"><button @click="$auth.signOut();">ログアウト</button></li>
  </ul>

  <!-- Head -->
  <h1>
    <div>{{user ? user.identifier : "ログインしましょう"}}</div>
  </h1>

  <!-- Profile -->
  <p>
    {{user && user.profile}}
  </p>

  <!-- Realod Posts Button -->
  <button @click="$nuxt.refresh">リロード</button>

  <!-- Posts -->
  <Posts @deletePost="openModal(); deleteId = $event;" :posts=posts display-username />

  <!-- Post Form -->
  <PostForm />

  <!-- Modal -->
  <div v-if="modal" @click.self="closeModal();" class="modal">
    <div class="modal-content">
      <strong>本当に削除しますか？</strong>
      <Post style="margin: 1rem 0;" :post="posts.find(post => post._id === deleteId)" />
      <div>
        <button @click="closeModal();">いいえ</button>
        <button @click="closeModal(); deletePost(deleteId)">はい</button>
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
const ua = window.navigator.userAgent.toLowerCase()
const isIOS = ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("macintosh") > -1 && "ontouched" in document

export default {
  data() {
    return {
      modal: false,
      deleteId: null,
      scrollY: 0,
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
    },
    openModal() {
      if (isIOS) {
        this.scrollY = window.scrollY
        this.modal = true
        document.body.style.position = "fixed"
        document.body.style.top = `${-this.scrollY}px`
      } else {
        this.modal = true
        document.body.style.overflow = "hidden"
      }
    },
    closeModal() {
      if (isIOS) {
        this.modal = false
        document.body.style.position = ""
        document.body.style.top = ""
        window.scrollTo(0, this.scrollY)
      } else {
        this.modal = false
        document.body.style.overflow = ""
      }
    }
  }
}
</script>