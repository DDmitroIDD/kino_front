<template>
  <div class="text-center">
    <form class="form-registration" @submit.prevent="userRegister">
      <h1 class="h3 mb-3 mt-3 font-weight-normal">For registration enter username and password twice!</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input id="inputUsername" class="form-control" placeholder="Username"
             required="" v-model="register.username">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control mt-2"
             placeholder="Password" required="" v-model="register.password">
      <label for="ReInputPassword" class="sr-only">Password confirmation</label>
      <input type="password" id="ReInputPassword" class="form-control mt-2"
             placeholder="Password confirmation" required="" v-model="register.password_confirmation">
      <button class="btn mt-2 btn-lg btn-primary btn-block" type="submit">Registration</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: "movie_detail",
  data() {
    return {
      register: {
        username: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  methods: {
    async userRegister() {
      try {
        let response = await this.$axios.post('/registration/', {
          username: this.register.username,
          password: this.register.password,
          password_confirmation: this.register.password_confirmation
        })
        console.log(response)
        await this.$auth.loginWith('local', {
          data: {
            username: this.register.username,
            password: this.register.password
          },

        })
        await this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
