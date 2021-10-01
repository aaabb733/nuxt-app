<template>
<div>
    <ul>
        <li>
            <n-link to="/">Home</n-link>
        </li>
    </ul>
    <h1>settings</h1>
    <form @submit.prevent="saveSettings">
        <div>
            <label style="font-weight: bold;" for="input-profile">Profile</label>
        </div>
        <div>
            <textarea @keydown.ctrl.enter="saveSettings" v-model="profile" style="width: 100%; max-width: 40rem;" name="profile" id="input-profile" cols="30" rows="10"></textarea>
        </div>
        <button type="submit">Save</button>
    </form>
</div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}
</style>

<script>
export default {
    data() {
        return {
            profile: ""
        }
    },
    computed: {
        viewer() {
            return this.$store.state.user
        }
    },
    methods: {
        async saveSettings() {
            if (this.profile) {
                await this.$auth.updateProfile(this.$store.state.user.identifier, this.$store.state.user.password, this.profile)
                const viewer = await this.$auth.getMyUser(this.viewer.identifier, this.viewer.password)
                this.$store.commit("setUser", viewer)
                this.profile = ""
            }
        }
    }
}
</script>