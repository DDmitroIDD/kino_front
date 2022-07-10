<template>
  <div>
    <Header :slug=title />
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
          <nuxt-link class="page-link" :to="next">Next</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";

export default {
  components: {Header},
  Layout: "movie_detail",
  async asyncData({params, route}) {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/tags/${params.slug}/`);
    const tags = await axios.get(`http://127.0.0.1:8000/api/tags/`);
    let query_page = route.query.page
    let page = query_page !== undefined ? `?page=${query_page}` : '';
    let next = data.next != null ? data.next.split('/')[5] : data.next;
    let previous = data.previous != null ? data.previous.split('/')[5] : data.previous;
    let current_page = query_page
    console.log(data)
    console.log(next)
    console.log(Number(current_page))
    return {
      movies: data.results,
      title: `#${params.slug}`,
      tags: tags.data,
      page: page,
      next: next,
      previous: previous,
      current_page: Number(current_page),
      total: Math.ceil(data.count / 8)

    }

  },
}
</script>

<style scoped>

</style>
