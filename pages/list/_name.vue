<template>
<div>
    <div v-if="users.length === 0">
        no result for {{$route.params.name}}
    </div>
    <div v-else-if="users.length > 1">
        too many results for {{$route.params.name}}, it's error!
    </div>
    <div v-else>
        <h3>
            {{users[0].name}}
        </h3>
        <div>
            {{users[0].desc}}
        </div>
    </div>
</div> 
</template>

<script>
export default {
    computed: {
        users() {
            return this.$store.state.users.filter(user => user.name === this.$route.params.name)
        }
    }
}
</script>