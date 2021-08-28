<template>
<div>
  <h4>
    {{new Date().toLocaleDateString()}}
  </h4>
  <ol>
    <li v-for="user in $store.state.users" :key="user.id">
      <NuxtLink :to="`list/${user.name}`">{{user.name}}</NuxtLink>
      <span>- {{user.desc}}</span>
    </li>
  </ol>
  <h4 style="margin-top: 40px;">
    {{new Date().toLocaleDateString()}}
  </h4>
  <ol>
    <li v-for="user in $store.state.users" :key="user.id">
      <NuxtLink :to="`list/${user.name}`">{{user.name}}</NuxtLink>
      <span>- {{user.desc}}</span>
    </li>
  </ol>
</div>
</template>