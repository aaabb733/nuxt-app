<template>
<div>
  <div v-for="user in $store.state.users" :key="user.id">
    <NuxtLink :to="`list/${user.name}`">{{user.name}}</NuxtLink>
    <span>{{user.desc}}</span>
  </div>
</div>
</template>

<script>
export default {}
</script>