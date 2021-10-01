<template>
<div v-if="alreadyLoggedOut">
    <n-link to="/">Home</n-link>
    <h1>You already logged out</h1>
</div>
</template>

<script>
export default {
    data() {
        return {
            alreadyLoggedOut: false
        }
    },
    created() {
        if (this.$store.state.user) {
            this.$auth.signOut()
            this.$router.push("/accounts/login")
        } else {
            this.alreadyLoggedOut = true
        }
    }
}
</script>