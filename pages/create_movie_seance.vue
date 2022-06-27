<template>
  <div>
    <div v-if="!message">
      <Header :head_for_feet="title" />
    </div>
    <div v-if="message">
      <Header :head_for_feet="message" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <nav aria-label="breadcrumb" class="mt-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Main</a></li>
              <li class="breadcrumb-item active" aria-current="page">Create movie seance</li>
            </ol>
          </nav>
          <h1 class="h3 mb-3 mt-3 font-weight-normal">For creating movie seance enter correct data!</h1>
          <form @submit.prevent="createMovieSeance">
            <div class="row form-group">
              <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.movie_title.$error }">
                <div class="md-form mb-0">
                  <label for="movie_title" class="sr-only">Movie title</label>
                  <input id="movie_title" type="text" class="form-control" placeholder="Movie title"
                         v-model="form.movie" @input="$v.form.movie_title.$touch">
                </div>
                <span class="msg-error" v-if="!$v.form.movie_title.required">
            <small>This field is required!</small>
          </span>
                <span class="msg-error" v-if="!$v.form.movie_title.minLength">
            <small>Length of symbols could be {{ $v.form.movie_title.$params.minLength.min }} or bigger!</small>
          </span>
              </div>
              <div class="form-group">
                <div class="md-form mb-0">
                  <label class="required" for="show_hall">Show hall</label>
                  <select v-model="form.show_hall">
                      <option v-for="hall in halls" :key="hall.id" v-bind:value="hall.id">
                        {{ hall.hall_name }}
                      </option>
                  </select>
                </div>
              </div>
              <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.movie_title.$error }">
                <div class="md-form mb-0">
                  <label for="movie_title" class="sr-only">Movie title</label>
                  <input id="movie_title" type="text" class="form-control" placeholder="Movie title"
                         v-model="form.movie" @input="$v.form.movie_title.$touch">
                </div>
                <span class="msg-error" v-if="!$v.form.movie_title.required">
                  <small>This field is required!</small>
                </span>
                <span class="msg-error" v-if="!$v.form.movie_title.minLength">
                  <small>Length of symbols could be {{ $v.form.movie_title.$params.minLength.min }} or bigger!</small>
                </span>
              </div>
            </div>
            <div class="text-center text-md-left mt-3">
              <button class="btn btn-primary" type="submit"
                      :disabled="!isCompleted">Create</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import { required, minLength, integer, } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import axios from "axios";

export default {
  components: {Header},
  layout: "movie_detail",
  name: "create_movie_seance",
  async asyncData() {
    try {
      const {data} = await axios.get('http://localhost:8000/api/cinema/');
      console.log(data)
      return {
        halls: data,
      }

    }catch (err) {
      console.log(err)

    }

  },
  data() {
    return {
      message: this.message,
      title: 'Fill the form!',
      form: {
        movie_title: '',
        show_hall: 1
      },

    }
  },


  computed: {
    isCompleted() {
      return !this.$v.$invalid;
    },


  },
  methods: {

    async createMovieSeance() {
      try {
        let response = await this.$axios.post('/movie/', {
          movie_title: this.form.movie_title,
          show_hall: this.form.show_hall
        }).then(response => {
          this.message = 'You are created a new movie seance!'
        })
        console.log(response)
        await this.$router.push('/create_movie_seance/')

      }catch (err) {
        console.log(err)
      }
    }
  },
  validations: {
    form: {
      movie_title: {
        required,
        minLength: minLength(5)
      },
      // hall_size: {
      //   required,
      //   integer
      // }
    }
  }
}

</script>

<style type="text/css">
.fld-error .msg-error {
  display: block;
  color: #dc3545;
}
.msg-error {
  display: none;
}

</style>
