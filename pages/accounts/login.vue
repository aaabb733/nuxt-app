<template>
    <div>
        <ul>
            <li>
                <nuxt-link to="/">Home</nuxt-link>
            </li>
        </ul>

        <!-- head -->
        <h1>Let's Sign In</h1>

        <!-- signin form -->
        <form @submit.prevent="signIn">
            <div>
                <label for="input-identifier">Email or username</label>
                <input placeholder="email or username" v-model="identifier" type="text" name="identifier" id="input-identifier">
            </div>
            <div style="color: red;">{{identifierError}}</div>
            <div>
                <label for="input-password">Password</label>
                <input placeholder="password" v-model="password" type="password" name="password" id="input-password">
            </div>
            <div style="color: red;">{{passwordError}}</div>
            <div style="color: red;">{{signInError}}</div>
            <button type="submit">Sign In</button>
        </form>
        <span>Don't have an account yet?</span>
        <n-link to="/accounts/signup">Sign Up</n-link>
    </div>
</template>

<style scoped>
label {
    font-weight: bold;
    display: table;
}
</style>

<script>
export default {
    data() {
        return {
            identifier: "",
            password: "",
            identifierError: "",
            passwordError: "",
            signInError: ""
        }
    },
    methods: {
        async signIn() {
            if (!this.identifier || !this.password) {
                if (!this.identifier) {
                    this.identifierError = "email or username is required"
                } else {
                    this.identifierError = ""
                }
                if (!this.password) {
                    this.passwordError = "password is required"
                } else {
                    this.passwordError = ""
                }
                this.signInError = ""
                return
            }
            const user = await this.$auth.signIn(this.identifier, this.password)
            if (user) {
                this.$store.commit("setUser", user)
                localStorage.setItem("user", JSON.stringify(user))
                this.$router.push("/")
            } else {
                this.signInError = "email or username or password is invalid"
                this.identifierError = ""
                this.passwordError = ""
            }
        }
    }
}
</script>