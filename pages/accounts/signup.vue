<template>
    <div>
        <ul>
            <li>
                <nuxt-link to="/">ホーム</nuxt-link>
            </li>
        </ul>

        <!-- head -->
        <h1>アカウントを作成しましょう</h1>
        
        <!-- signup form -->
        <form @submit.prevent="signUp">
            <div>
                <label for="input-identifier">ユーザーネーム</label>
            </div>
            <div>
                <input placeholder="email or username" v-model="identifier" type="text" name="identifier" id="input-identifier">
            </div>
            <div style="color: red;">{{identifierError}}</div>
            <div>
                <label for="input-password">パスワード</label>
            </div>
            <div>
                <input placeholder="password" v-model="password" type="password" name="password" id="input-password">
            </div>
            <div style="color: red;">{{passwordError}}</div>
            <div style="color: red;">{{signUpError}}</div>
            <button type="submit">アカウントを作成</button>
        </form>
        <span>既にアカウントを持っていますか？</span>
        <n-link to="/accounts/login">ログインする</n-link>
    </div>
</template>

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