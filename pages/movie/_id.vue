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
          <div v-if="!user || user && !user.is_staff">
          <p>Date: {{movie.start_datetime.slice(0, 10)}}</p>
          <p>Start seance: {{movie.start_datetime.slice(11, 16)}}</p>
          <p>End seance: {{movie.end_datetime.slice(11, 16)}}</p>
          <p>Price: {{movie.price}}</p>
          </div>
          <div v-if="user && user.is_staff">
            <form @submit.prevent="changeMovie">
            <!--              Start_datetime start!!! -->
            <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.start_datetime.$error }">
              <div class="md-form mb-0">
                Start datetime
                <label for="start_datetime" class="sr-only">Start datetime</label>
                <input id="start_datetime" type="datetime-local" class="form-control" placeholder="Start_datetime"
                       v-model="form.start_datetime" @input="$v.form.start_datetime.$touch">
              </div>
              <span class="msg-error" v-if="!$v.form.start_datetime.required">
                  <small>This field is required!</small>
                </span>
            </div>
            <!--              Start_datetime end!!! -->
            <!--              end_datetime start!!!-->
            <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.end_datetime.$error }">
              <div class="md-form mb-0">
                End datetime
                <label for="end_datetime" class="sr-only">End datetime</label>
                <input id="end_datetime" type="datetime-local" class="form-control" placeholder="End_datetime"
                       v-model="form.end_datetime" @input="$v.form.end_datetime.$touch">
              </div>
              <span class="msg-error" v-if="!$v.form.end_datetime.required">
                  <small>This field is required!</small>
                </span>
            </div>
            <!--              end_datetime end!!! -->
            <!--              Price start!!! -->
            <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.price.$error }">
              <div class="md-form mb-0">
                <label for="price" class="sr-only">Price</label>
                <input id="price" type="number" class="form-control" placeholder="Price"
                       v-model="form.price" @input="$v.form.price.$touch">
              </div>
              <span class="msg-error" v-if="!$v.form.price.required">
                  <small>This field is required!</small>
                </span>
              <span class="msg-error" v-if="!$v.form.price.minValue">
            <small>Price could be {{ $v.form.price.$params.minValue.min }} or bigger!</small>
          </span>
            </div>
            <!--              Price end!!! -->
            </form>

          </div>
          <p>Movie duration: {{minutes}} min</p>
          <p>Free seats: {{movie.qyt}}</p>
          <div>
            <form @submit.prevent="createTickets" v-if="user && !user.is_staff">
              <div class="row form-group">
                <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form_buy.qt.$error }">
                  <div class="md-form mb-0">
                    <label for="qt" class="sr-only">Qt</label>
                    <input id="qt" type="number" class="form-control" placeholder="Qt"
                           v-model="form_buy.qt" @input="$v.form_buy.qt.$touch">
                  </div>
                  <span class="msg-error" v-if="!$v.form_buy.qt.required">
                  <small>This field is required!</small>
                </span>
                  <span class="msg-error" v-if="!$v.form_buy.qt.minValue">
            <small>Qt. could be {{ $v.form_buy.qt.$params.minValue.min }} or bigger!</small>
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
import {minLength, minValue, required} from "vuelidate/lib/validators";

export default {
  components: {
    Header,
    Aside,
  },

  layout: "movie_detail",
  async asyncData({params}) {
    const movie = await axios.get(`http://127.0.0.1:8000/api/movie/${params.id}`);
    const tags = await axios.get(`http://127.0.0.1:8000/api/tags/`);
    const lastFive = await axios.get(`http://127.0.0.1:8000/api/last_five/`);
    let start = (movie.data.start_datetime);
    let end = (movie.data.end_datetime);
    let milliseconds = ((new Date(end)) - (new Date(start)));
    let minutes = milliseconds / (60000);
    let tz = new Date(movie.data.start_datetime)
    console.log(new Date(movie.data.start_datetime).s)
    console.log(movie.data.start_datetime)
    console.log(new Date(tz.getTime() - tz.getTimezoneOffset() * 60000))
    return {
      movie: movie.data,
      tags: tags.data,
      lastFive: lastFive.data,
      minutes: minutes,
      message: movie.data.movie,
      form_buy: {
        qt: 1
      },
      form: {
        start_datetime: new Date(movie.data.start_datetime).toISOString().slice(0, -8),
        end_datetime: new Date(movie.data.end_datetime).toISOString().slice(0, -8),
        price: 0,

      },
    }
  },
  data() {
    return{
      message: 'a',

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
          qt: this.form_buy.qt
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
    form_buy: {
      qt: {
        required,
        minValue: minValue(1)
      }
    },
      form: {
        movie: {
          required,
          minLength: minLength(2)
        },
        hall: {
          required,
        },
        start_datetime: {
          required
        },
        end_datetime: {
          required
        },
        price: {
          required,
          minValue: minValue(1)
        },
        tag: {
          required
        },
        description: {
          required,
          minLength: minLength(20)

        },

      }
    }

}
</script>

<style scoped>

</style>
