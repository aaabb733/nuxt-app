<template>
    <div>
        <!-- Header nav -->
        <ul>
            <li>
                <n-link to="/">Home</n-link>
            </li>
            <li>
                <n-link to="/users">Users</n-link>
            </li>
        </ul>
        <h1>{{$route.params.username}}</h1>

        <p v-if="user.profile">{{user.profile}}</p>

        <Posts :posts="posts"/>

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