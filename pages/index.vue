<template>
<div>
  <ul>
    <li v-for="i in [1,2,3,4,5]" :key="i">
      <h5>{{ new Date().toLocaleDateString() }}</h5>
        <ol>
          <li v-for="user in $store.state.users" :key="user.id">
            <NuxtLink :to="`list/${user.name}`">{{user.name}}</NuxtLink>
            <span>- {{user.desc}}</span>
          </li>
      </ol>
    </li>
  </ul>
</div>
</template>