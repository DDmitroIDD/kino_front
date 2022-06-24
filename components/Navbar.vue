<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <nuxt-link class="navbar-brand" to="/">
      <img src="/images/Designbolts-Free-Multimedia-Film.ico" width="30" height="30" alt="logo">
    </nuxt-link>
    <nuxt-link class="navbar-brand" to="/">
      <img src="/images/cinema-film.jpg" width="30" height="30" alt="logo">
    </nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse"

            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <nuxt-link class="nav-link" to="/">Main</nuxt-link>
        </li>
        <li class="nav-item ">
          <nuxt-link class="nav-link" to="/feedback">Feedback</nuxt-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input name="q" v-model="q" type="text" class="form-control mr-sm-2" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0 mr-2" type="submit" @click.stop.prevent="submit()">Search</button>
      </form>
      <client-only>

        <span class="navbar-text mr-2 text-center" v-if="user">
          <img class="d-flex mr-3 rounded-circle" :src="user.avatar" width="40" height="40" alt="">
          {{ user.username }}
        </span>

        <span class=" mr-2" v-if="user.is_staff">
          <nuxt-link class="btn btn-outline-light" to="/create_hall">Create hall</nuxt-link>
          <nuxt-link class="btn btn-outline-light" to="/create_movie_seance">Create movie seance</nuxt-link>
        </span>

      <span v-if="loggedIn"><nuxt-link class="btn btn-outline-light mr-2" to="/logout">LogOut</nuxt-link></span>
      <span v-else>
        <nuxt-link class="btn btn-outline-light mr-2" to="/login">LogIn</nuxt-link>
        <nuxt-link class="btn btn-outline-light mr-2" to="/registration">SingUp</nuxt-link>
      </span>
      </client-only>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Navbar",

  data(){
    return {
      q : null
    }
  },

  methods: {
    submit(){
      this.$router.push("/search?q="+this.q);
    }
  },
  computed: {
    loggedIn(){
      return this.$auth.loggedIn
    },
    user(){
      return this.$auth.user
    }
  }
}
</script>

<style scoped>

</style>
