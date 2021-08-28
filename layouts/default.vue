<template>
    <div class="content">
        <div class="header">
            <NuxtLink to="/" class="header">Home</NuxtLink>
        </div>
        <Nuxt class="main" />
    </div>
</template>

<style scoped>
.content {
    margin: 20px;
}
/* .header {
    background-color: #f3f3f3;
} */
.main {
    margin-top: 20px;
    padding: 1px 40px;
    background-color: #f3f3f3;
}
</style>