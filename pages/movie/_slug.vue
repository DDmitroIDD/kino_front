<template>
  <div>
    <Header :movie_title=movie.movie />
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <nav aria-label="breadcrumb" class="mt-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><nuxt-link to="/">Main</nuxt-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ movie.movie }}</li>
          </ol>
        </nav>
        <img class="fluid" width="700" height="800" :src="movie.image" alt="Poster">
        <hr>


        <div v-html="movie.description"></div>

        <div class="d-flex justify-content-end">
          <span v-for="tag in movie.tag">
                <nuxt-link :to="`/api/tags/${tag}`" class="mr-1 badge badge-info">#{{ tag }}</nuxt-link>
          </span>
        </div>
        <hr>
      </div>
      <Aside :tags=tags :lastFive=lastFive />
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import movie_detail from "@/layouts/movie_detail";
import Aside from "@/components/Aside";

export default {
  components: {
    Header,
    Aside,
  },
  layout: "movie_detail",
  async asyncData({params}) {
    const movie = await axios.get(`http://127.0.0.1:8000/api/movie/${params.slug}`);
    const tags = await axios.get(`http://127.0.0.1:8000/api/tags/`);
    const lastFive = await axios.get(`http://127.0.0.1:8000/api/last_five/`);
    console.log(lastFive)
    return {
      movie: movie.data,
      tags: tags.data,
      lastFive: lastFive.data,

    }
  },
  computed: {
    user(){
      return this.$auth.user
    },

  },
  methods: {
    async updateMovie() {

    }
  }
}
</script>

<style scoped>

</style>
