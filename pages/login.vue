<template>
  <div>
    <div  class="text-danger">
      <Header :head_for_feet="message"/>
    </div>
    <div class="text-center">
      <form class="form-login" @submit.prevent="userLogin">
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
import Header from "../components/Header";

export default {
  components: {Header},
  layout: "movie_detail",
  data() {
    return {
      message: this.message ? this.message : 'Please enter your username and password',
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
        this.$router.push('/')
      } catch (err) {
        this.message = err.response.data.detail
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
