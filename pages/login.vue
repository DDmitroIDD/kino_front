<template>
  <div>
    <div class="text-center">
      <form class="form-login" @submit.prevent="userLogin">
        <h1 class="h3 mb-3 mt-3 font-weight-normal">Please enter your username and password</h1>
        <label for="inputUsername" class="sr-only">username</label>
        <input id="inputUsername" class="form-control" placeholder="username" required="" v-model="login.username">
        <label for="inputPassword" class="sr-only">password</label>
        <input type="password" id="inputPassword" class="form-control mt-2" placeholder="password" required="" v-model="login.password">
        <button class="btn mt-2 btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "movie_detail",
  data() {
    return {
      login: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        console.log(response)
        // console.log(this.$auth.hasScope('is_superuser'))
        // console.log(this.$store.state.auth.user)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
