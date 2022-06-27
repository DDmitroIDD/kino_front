<template>
  <div></div>
</template>

<script>
export default {
  async created() {
    await this.$auth.logout()
    await this.$router.push('/')
  }
}
</script>
