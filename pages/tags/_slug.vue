<template>
  <div>
<!--    <Header :slug=title />-->
      <div class="container">
        <p class="my-3">Others tags:
        <nuxt-link :to="`${tag.name}`" class="badge badge-success mr-1"
                   v-for="tag in tags" :key="tag.name">#{{tag.name}} </nuxt-link>
        </p>
        <div class="row">
          <div v-for="movie in movies" :key="movie.id" class="col-md-3">
            <div class="card mb-4 shadow-sm">
              <nuxt-link :to="`/movie/${movie.id}`">
                <img :src="movie.image" alt="movie.movie_title" class="card-img-top" width="300" height="350">
              </nuxt-link>

              <div class="card-body text-primary">
                <h2 class="card-title">{{ movie.movie }}</h2>
                <h5>Show data: {{movie.start_datetime.slice(0, 10)}}</h5>
                <h5>Start time: {{movie.start_datetime.slice(11, 16)}}</h5>
                <h5>End time: {{movie.end_datetime.slice(11, 16)}}</h5>
                <h5>Hall: {{movie.hall}}</h5>
                <div class="mb-2">
                <span v-for="tag in movie.tag">
                  <nuxt-link :to="`/tags/${tag}`" class="mr-1 badge badge-info">#{{tag}}</nuxt-link>
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    <nav aria-label="Paginate me">
      <ul class="pagination justify-content-center">
        <nuxt-link v-if="previous != null" class="page-link" :to="previous" tabindex="-1">Previous</nuxt-link>
        <li v-else class="page-item disabled">
          <a class="page-link disabled" href="#" tabindex="-1">Previous</a>
        </li>
        <span v-for="i in total">
          <li  v-if="current_page === i || ($route.query.page === '/' && i === 1)" class="page-item active">
            <nuxt-link class="page-link" :to="`?page=${i}`">{{i}}</nuxt-link></li>
          <li v-else class="page-item">
            <nuxt-link class="page-link" :to="`?page=${i}`">{{i}}</nuxt-link></li>
        </span>
        <nuxt-link v-if="next != null" class="page-link" :to="next">Next</nuxt-link>
        <li v-else class="page-item disabled">
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {mapState} from "vuex";

export default {
  // components: {Header},
  Layout: "movie_detail",
  watchQuery: ['page'],
  computed: {
    ...mapState('tags/_slug', ["movies", "slug", "tags", "current_page", "next", "total", "previous"])
  },
  async fetch({store, route}) {

    await store.dispatch('tags/_slug/loadAllTagMovies', {
      tag_param: route.params.slug,
      query_page: route.query.page
    })

  },

  }
</script>

<style scoped>

</style>
