<template>
    <div>
        <ul>
            <li>
                <n-link to="/">Home</n-link>
            </li>
            <li>
                <n-link to="/users">Users</n-link>
            </li>
        </ul>
        <h1>{{$route.params.username}}</h1>

        <p>{{user.profile}}</p>

        <!-- posts -->
        <ul v-if="posts.length > 0">
            <li v-for="post in posts" :key="post._id">
                <p style="word-break: break-all;">
                {{post.content}} [{{post.date.toLocaleString()}}]
                </p>
            </li>
        </ul>
        <div v-else>
            there are no posts
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({$auth, $posts, route}) {
        return {
            user: await $auth.getUser(route.params.username),
            posts: await $posts.getPostsFromUser(route.params.username)
        }
    }
}
</script>