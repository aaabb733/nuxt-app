<template>
<ul v-if="posts.length > 0">
    <li v-for="post in posts" :key="post._id">
        <Post @deletePost="$emit('deletePost', post._id)" :post=post :display-username="displayUsername"/>
    </li>
</ul>
<p v-else>
    there are no posts
</p>
</template>

<script>
export default {
    props: {
        posts: Array,
        displayUsername: Boolean
    }
}
</script>