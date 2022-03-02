<template>
<div>
    <n-link v-if="displayUsername" :to="`/${post.author}`">{{post.author}}</n-link>
    <span>{{post.date.toLocaleDateString()}}</span>
    <button @click="$emit('deletePost', post._id)" v-if="displayUsername && $store.state.user && $store.state.user.identifier === post.author">
        削除
    </button>
    <p style="word-break: break-all;">{{post.content}}</p>
</div>
</template>

<script>
export default {
    props: {
        post: Object,
        displayUsername: Boolean
    }
}
</script>