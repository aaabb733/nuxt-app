<template>
    <div>
        <ul>
            <li>
                <nuxt-link to="/">Home</nuxt-link>
            </li>
        </ul>

        <!-- head -->
        <h1>Let's Sign Up!</h1>
        
        <!-- signup form -->
        <form @submit.prevent="signUp">
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
            <div style="color: red;">{{signUpError}}</div>
            <button type="submit">Sign Up</button>
        </form>
        <span>Already have an account?</span>
        <n-link to="/accounts/login">Sign In</n-link>
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
            signUpError: ""
        }
    },
    methods: {
        async signUp() {
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
                this.signUpError = ""
                return
            }
            const error = await this.$auth.signUp(this.identifier, this.password)
            if (error) {
                this.signUpError = error
                this.identifierError = ""
                this.passwordError = ""
            } else {
                this.$router.push("/accounts/login")
            }
        }
    }
}
</script>