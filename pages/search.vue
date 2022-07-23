<template>
  <div>
    <Header :movie_count=count_movies />
<div class="container">

<div>
  <div class="row">
    <div class="col-lg-12">
      <nav aria-label="breadcrumb" class="mt-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><nuxt-link to="/">Main</nuxt-link></li>
          <li class="breadcrumb-item active" aria-current="page">Search</li>
        </ol>
      </nav>
      <div class="row">
<!--        {{movies}}-->
        <div v-for="movie in movies.results" :key="movie.id" class="col-md-3">
          <div class="card mb-4 shadow-sm">
            <nuxt-link :to="`/movie/${movie.id}`">
              <img :src="movie.image" alt="movie.movie_title" class="card-img-top" width="300" height="350">
            </nuxt-link>

            <div class="card-body text-primary">
              <h2 class="card-title">{{ movie.movie }}</h2>
              <h5>Start time: {{movie.start_datetime.slice(0, 5)}}</h5>
              <h5>End time: {{movie.end_datetime.slice(0, 5)}}</h5>
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
  </div>
</div>
</div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
export default {
  components: {Header},
  layout: "movie_detail",
  watchQuery: ['q'],
  async asyncData({route}) {
    const { data } = await axios.get(`http://localhost:8000/api/movie/?q=${route.query.q}`);
    return {

      movies: data,
      count_movies: data.count > 1 ? `We found ${data.count} movies!` : `We found ${data.count} movie!`
    }
  },
}
</script>

<style scoped>

</style>
