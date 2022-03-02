<template>
    <div>
        <ul>
            <li>
                <nuxt-link to="/">ホーム</nuxt-link>
            </li>
        </ul>

        <!-- head -->
        <h1>ログインしましょう</h1>

        <!-- signin form -->
        <form @submit.prevent="signIn">
            <div>
                <label for="input-identifier">ユーザーネーム</label>
            </div>
            <div>
                <input placeholder="ユーザーネーム" v-model="identifier" type="text" name="identifier" id="input-identifier">
            </div>
            <div style="color: red;">{{identifierError}}</div>
            <div>
                <label for="input-password">パスワード</label>
            </div>
            <div>
                <input placeholder="パスワード" v-model="password" type="password" name="password" id="input-password">
            </div>
            <div style="color: red;">{{passwordError}}</div>
            <div style="color: red;">{{signInError}}</div>
            <button type="submit">ログイン</button>
        </form>
        <span>まだアカウントを持っていませんか？</span>
        <n-link to="/accounts/signup">アカウントを作成する</n-link>
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
            signInError: ""
        }
    },
    methods: {
        async signIn() {
            if (!this.identifier || !this.password) {
                if (!this.identifier) {
                    this.identifierError = "ユーザーネームを入力してください"
                } else {
                    this.identifierError = ""
                }
                if (!this.password) {
                    this.passwordError = "パスワードを入力してください"
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
                this.signInError = "ユーザーネームまたはパスワードが違います"
                this.identifierError = ""
                this.passwordError = ""
            }
        }
    }
}
</script>