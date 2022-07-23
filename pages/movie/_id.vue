<template>
  <div>
    <Header :movie_title=message />
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
                <nuxt-link :to="`/tags/${tag}`" class="mr-1 badge badge-info">#{{ tag }}</nuxt-link>
          </span>
        </div>
        <hr>
        <div class="text-primary font-weight-bold">
          <p>Hall: {{movie.hall}}</p>
          <p>Date: {{movie.start_datetime.slice(0, 10)}}</p>
          <p>Start seance: {{movie.start_datetime.slice(11, 16)}}</p>
          <p>End seance: {{movie.end_datetime.slice(11, 16)}}</p>
          <p>Movie duration: {{minutes}} min</p>
          <p>Free seats: {{movie.qyt}}</p>
          <p>Price: {{movie.price}}</p>
          <div>
            <form @submit.prevent="createTickets" v-if="user && !user.is_staff">
              <div class="row form-group">
                <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.qt.$error }">
                  <div class="md-form mb-0">
                    <label for="qt" class="sr-only">Qt</label>
                    <input id="qt" type="number" class="form-control" placeholder="Qt"
                           v-model="form.qt" @input="$v.form.qt.$touch">
                  </div>
                  <span class="msg-error" v-if="!$v.form.qt.required">
                  <small>This field is required!</small>
                </span>
                  <span class="msg-error" v-if="!$v.form.qt.minValue">
            <small>Qt. could be {{ $v.form.qt.$params.minValue.min }} or bigger!</small>
          </span>
                </div>
              </div>
              <div class="text-center text-md-left mt-3">
                <button class="btn btn-primary" type="submit"
                        :disabled='!isCompleted'>Buy</button>
              </div>
            </form>
            <div class="text-center text-md-left mt-3" v-if="user && user.is_staff">
              <nuxt-link :to="`/movie_for_update/${movie.slug}`">
                <button class="btn btn-primary" type="submit">Change movie</button>
              </nuxt-link>
            </div>

          </div>
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
import {minValue, required} from "vuelidate/lib/validators";

export default {
  components: {
    Header,
    Aside,
  },

  layout: "movie_detail",
  async asyncData({params}) {
    console.log(params)
    const movie = await axios.get(`http://127.0.0.1:8000/api/movie/${params.id}`);
    const tags = await axios.get(`http://127.0.0.1:8000/api/tags/`);
    const lastFive = await axios.get(`http://127.0.0.1:8000/api/last_five/`);
    let start = (movie.data.start_datetime);
    let end = (movie.data.end_datetime);
    let milliseconds = ((new Date(end)) - (new Date(start)));
    let minutes = milliseconds / (60000);
    return {
      movie: movie.data,
      tags: tags.data,
      lastFive: lastFive.data,
      minutes: minutes,
      message: movie.data.movie,
      form: {
        qt: 1
      }
    }
  },
  data() {
    return{
      message: 'a'
    }
  },
  computed: {
    user(){
      return this.$auth.user
    },
    isCompleted() {
      return !this.$v.$invalid;
    },

  },
  methods: {
    async changeMovie() {

    },
    async createTickets() {
      try {
        let response = await this.$axios.post('/ticket/', {
          customer: this.user.id,
          movie: this.movie.id,
          qt: this.form.qt
        }).then(response => {
          console.log(response)
        })
        await window.location.reload(true)
      }catch(err) {
        this.message = Object.values(err.response.data)[0]
        console.log(err)
      }
    }
  },
  validations: {
    form: {
      qt: {
        required,
        minValue: minValue(1)
      }
    }
  }

}
</script>

<style scoped>

</style>
