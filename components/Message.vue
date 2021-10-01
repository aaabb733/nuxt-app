<template>
<p>
    {{message}}
    <button @click="$emit('delete')">OK</button>
</p>
</template>

<script>
export default {
    props: {
        message: String
    }
}
</script>