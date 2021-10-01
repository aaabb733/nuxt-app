<template>
    <div>

        <ul>
            <li>
                <n-link to="/">Home</n-link>
            </li>
        </ul>

        <!-- users list -->
        <ul v-if="users.length > 0">
            <li v-for="user in users" :key="user.identifier">
                <n-link :to="`/${user.identifier}`">{{user.identifier}}</n-link>
                <p>{{user.profile}}</p>
            </li>
        </ul>
        <h1 v-else>there are no users</h1>
    </div>
</template>

<script>
export default {
    async asyncData({$auth}) {
        return {
            users: await $auth.getAllUsers()
        }
    }
}
</script>