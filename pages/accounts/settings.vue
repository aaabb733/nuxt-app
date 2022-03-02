<template>
<div>
    <ul>
        <li>
            <n-link to="/">ホーム</n-link>
        </li>
    </ul>
    <h1>設定</h1>
    <form @submit.prevent="saveSettings">
        <!-- <div>
            <label for="">ユーザーネーム</label>
        </div>
        <div>
            <input type="text">
        </div> -->
        <div>
            <label for="input-profile">プロフィール</label>
        </div>
        <div>
            <textarea @keydown.ctrl.enter="saveSettings" v-model="profile" style="width: 100%; max-width: 40rem;" name="profile" id="input-profile" cols="30" rows="10"></textarea>
        </div>
        <button type="submit">保存</button>
        <button type="button" @click="profile=$store.state.user.profile">変更をリセット</button>
    </form>
    <Message @delete="message=''" v-if="message" :message="message" />
</div>
</template>

<script>
export default {
    data() {
        return {
            profile: this.$store.state.user.profile,
            message: ""
        }
    },
    methods: {
        async saveSettings() {
            if (this.profile && this.profile !== this.$store.state.user.profile) {
                await this.$auth.updateProfile(this.$store.state.user.identifier, this.$store.state.user.password, this.profile)
                const user = await this.$auth.getMyUser(this.$store.state.user.identifier, this.$store.state.user.password)
                this.$store.commit("setUser", user)
                this.message = "変更を保存しました"
            }
        }
    }
}
</script>