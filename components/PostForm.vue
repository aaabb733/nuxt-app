<template>
<form @submit.prevent="post" v-if="$store.state.user">
    <div>
        <label for="input-content">投稿しよう</label>
    </div>
    <div>
        <textarea @keydown.ctrl.enter="post" v-model="content" name="content" id="input-content" cols="30" rows="10"></textarea>
    </div>
    <button type="submit">投稿する</button>
</form>
</template>

<script>
export default {
    data() {
        return {
            content: ""
        }
    },
    methods: {
        post() {
            if (this.content) {
                this.$posts.post(this.$store.state.user.identifier, this.content)
                this.content = ""
                this.$nuxt.refresh()
            }
        }
    }
}
</script>