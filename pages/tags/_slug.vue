<template>
  <div>
    <Header :slug=title />
      <div class="container">
        <p class="my-3">Others tags:
        <nuxt-link :to="`${tag.name}`" class="badge badge-success mr-1"
                   v-for="tag in tags" :key="name">#{{tag.name}} </nuxt-link>
        </p>
        <div class="row">
          <div v-for="movie in movies" :key="movie.slug" class="col-md-3">
            <div class="card mb-4 shadow-sm">
              <nuxt-link :to="`/movie_seances/${movie.slug}`">
                <img :src="movie.image" alt="movie.movie_title" class="card-img-top" width="300" height="350">
              </nuxt-link>

              <div class="card-body text-primary">
                <h2 class="card-title">{{ movie.movie_title }}</h2>
                <h5>Start time: {{movie.start_time_seance.slice(0, 5)}}</h5>
                <h5>End time: {{movie.end_time_seance.slice(0, 5)}}</h5>
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
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";

export default {
  components: {Header},
  Layout: "movie_detail",
  async asyncData({params}) {
    const { data } = await axios.get(`http://127.0.0.1:8000/tags/${params.slug}/`);
    const tags = await axios.get(`http://127.0.0.1:8000/tags/`);
    return {
      movies: data.results,
      title: `#${params.slug}`,
      tags: tags.data,

    }
  },
}
</script>

<style scoped>

</style>
