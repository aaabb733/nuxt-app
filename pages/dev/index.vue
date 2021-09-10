<template>
    <div>
        <input type="radio" id="searchKey_id" value="id" v-model="searchKey">
        <label for="searchKey_id">id</label>
        <br>
        <input type="radio" id="searchKey_username" value="username" v-model="searchKey">
        <label for="searchKey_username">username</label>
        <br>
        <input :placeholder="searchKey" @keyup.enter="search" v-model="searchValue">
        <br>
        <input placeholder="API key" @keyup.enter="search" v-model="apiKey">
        <br>
        <button @click="search">Search</button>
        <br>
    </div>
</template>

<script>
export default {
    methods: {
        async search() {
            const res = await this.$axios.get(`/api?${this.searchKey}=${this.searchValue}&apiKey=${this.apiKey}`)
            console.log(res.data)
        }
    },
    data() {
        return {
            searchKey: "id",
            searchValue: "",
            apiKey: "aiueo700"
        }
    },
}
</script>