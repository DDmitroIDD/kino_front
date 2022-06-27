<template>
  <div class="col-md-4">
    <div class="card my-4">
      <h5 class="card-header">Tags</h5>
      <div class="card-body">
        <div class="d-flex flex-wrap">
          <nuxt-link :to="`/tags/${tag.name}`" class="m-2 h5" v-for="tag in tags" :key="tag.name">#{{tag.name}}
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="card my-4">
      <h5 class="card-header">last movies</h5>
      <div class="card-body" v-for="movie in lastFive" :key="movie.id">

        <h5 class="card-title">{{movie.movie_title}}</h5>
        <nuxt-link :to="`${movie.slug}`" class="card-link">
        <img :src="movie.image" alt=movie.movie_title class="card-img-top">
        </nuxt-link>
        <div v-html="movie.description" class="text-truncate"></div>
      <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  props: ["tags", "lastFive"],

}
</script>

<style scoped>

</style>
