<template>
  <div>
    <Header :movie_title=message />
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <nav aria-label="breadcrumb" class="mt-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><nuxt-link to="/">Main</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">{{ user.username }}</li>
            </ol>
          </nav>
          <img class="fluid" width="200" height="300" :src="user.avatar" alt="Avatar">
          <p class="font-weight-bold">Money spent: {{user.money_spent}}</p>
          <hr>
          <div class="bg-info clearfix font-weight-bold container" v-for="ticket in tickets" key="ticket.id">
            <div class="row">
              <div class="col-mb-12">
                <img style="float:left;width:200px;height:300px;margin-top:5px;margin-bottom:5px"
                     :src="ticket.movie.image" />
                <p class="text-center" style="margin-bottom: 3px; margin-top: 10px">Order №{{ticket.id}}</p>
                <p class="text-center" style="margin-bottom: 3px">Hall: {{ticket.movie.hall}}</p>
                <p class="text-center" style="margin-bottom: 3px">Movie: {{ticket.movie.movie}}</p>
                <p class="text-center" style="margin-bottom: 3px">Date: {{ticket.movie.start_datetime.slice(0, 10)}}</p>
                <p class="text-center" style="margin-bottom: 3px">Start movie: {{ticket.movie.start_datetime.slice(11, 16)}}</p>
                <p class="text-center" style="margin-bottom: 3px">End movie: {{ticket.movie.end_datetime.slice(11, 16)}}</p>
                <p class="text-center" style="margin-bottom: 3px">Price: {{ticket.movie.price}}</p>
                <p class="text-center" style="margin-bottom: 3px">Qt: {{ticket.qt}}</p>
                <p class="text-center" style="margin-bottom: 3px">Sum: {{ticket.qt * ticket.movie.price}}</p>
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import Header from "@/components/Header";
  import {mapState} from "vuex";

  export default {
    components: {
      Header
    },
    watchQuery: ['page'],
    computed: {
      ...mapState("profile/profile", ['tickets', 'total', 'next', 'previous', 'current_page', 'count']),
      message(count) {
        console.log(count.count)
        return `You have ${count.count} orders!`
      },
      user(){
        return this.$auth.user
      },
    },
    async fetch({store, route}) {
      await store.dispatch('profile/profile/loadAllTickets', {query_page: route.query.page})
    },

    head() {
      return {
        title: 'This is main page',
        meta: [
          { hid: 'description', name: 'description', content: 'This is description'},
          { hid: 'keywords', name: 'keywords', content: 'keyword 1, keyword 2'},
        ]
      }
    },
  }
</script>

<style scoped>

</style>
