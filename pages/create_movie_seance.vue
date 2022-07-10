<template>
  <div v-if="user && user.is_stuff">
    <div>
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
<!--              Movie title start!!!     -->
              <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.movie.$error }">
                <div class="md-form mb-0">
                  <label for="movie" class="sr-only">Movie title</label>
                  <input id="movie" type="text" class="form-control" placeholder="Movie"
                         v-model="form.movie" @input="$v.form.movie.$touch">
                </div>
                <span class="msg-error" v-if="!$v.form.movie.required">
            <small>This field is required!</small>
          </span>
                <span class="msg-error" v-if="!$v.form.movie.minLength">
            <small>Length of symbols could be {{ $v.form.movie.$params.minLength.min }} or bigger!</small>
          </span>
              </div>
<!--              Movie title end!!! -->
<!--              Hall start!!! -->
              <div class="form-group col-md-6" v-bind:class="{ 'fld-error': $v.form.hall.$error }">

                  <label class="required" for="hall">Show hall</label>
                  <select v-model="form.hall">
                      <option v-for="hall in halls" :key="hall.id" v-bind:value="hall.hall_name">
                        {{ hall.hall_name }} {{ hall.hall_size }} seats!
                      </option>
                  </select>
                <span class="msg-error" v-if="!$v.form.movie.required">
            <small>This field is required!</small>
          </span>

              </div>
<!--              Hall end!!! -->
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
<!--              Image start!!! -->
              <div class="col-md-6">
                <div class="md-form mb-0">
                  <b-form-file
                    v-model="form.image"
                    :state="Boolean(form.image)"
                    placeholder="Choose a image or drop it here..."
                    drop-placeholder="Drop image here..."
                    @change="handleFileUpload( $event )"
                    path="/media/"
                  ></b-form-file>
                </div>
              </div>
<!--              Image end!!! -->
<!--              Tag start!!! -->
              <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.tag.$error }">
                <div class="md-form mb-0">
                  <label for="tag" class="sr-only">Type a new tag and press enter</label>
                  <b-form-tags input-id="tag" v-model="form.tag" @input="$v.form.price.$touch"></b-form-tags>
                </div>
                <span class="msg-error" v-if="!$v.form.tag.required">
                  <small>This field is required!</small>
                </span>
              </div>
<!--              Tag end!!! -->
<!--              Description start!!! -->
              <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.description.$error }">
                <div class="md-form mb-0">
                  <label for="description" class="sr-only">Description</label>
                  <b-form-textarea id="description"
                                   placeholder="Description"
                                   size="sm"
                                   v-model="form.description" @input="$v.form.description.$touch"></b-form-textarea>
                </div>
                <span class="msg-error" v-if="!$v.form.description.required">
            <small>This field is required!</small>
          </span>
                <span class="msg-error" v-if="!$v.form.description.minLength">
            <small>Length of symbols could be {{ $v.form.description.$params.minLength.min }} or bigger!</small>
          </span>
              </div>
<!--              Description end!!! -->
            </div>
            <div class="text-center text-md-left mt-3">
              <button class="btn btn-primary" type="submit"
                      :disabled='!isCompleted'>Create</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Header :head_for_feet="perm_mess" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import { required, minLength, minValue, } from 'vuelidate/lib/validators';
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
      message: this.message ? this.message : 'Fill the form!',
      perm_mess: 'You do not have permission for this page!',
      form: {
        movie: '',
        hall: '',
        start_datetime: new Date(),
        end_datetime: new Date(),
        price: null,
        image: null,
        tag: null,
        description: '',

      },

    }
  },


  computed: {
    isCompleted() {
      return !this.$v.$invalid;
    },
    user(){
      return this.$auth.user
    }


  },
  methods: {

    async createMovieSeance() {
      try {
        let response = await this.$axios.post('/movie/', {
          movie: this.form.movie,
          hall: this.form.hall,
          start_datetime: this.form.start_datetime,
          end_datetime: this.form.end_datetime,
          price: this.form.price,
          image: this.form.image,
          tag: JSON.stringify(this.form.tag),
          description: this.form.description,

        },
        {headers:
            {'content-type': 'multipart/form-data'}
        }).then(response => {
          this.message = 'You are created a new movie seance!'
          console.log(response)
          let movieId = response.data.id
          this.$router.push(`movie/${movieId}`)
        })
      }catch (err) {
        this.message = Object.values(err.response.data)[0]
        console.log(err.response.data)
        console.log(err)
      }
    },
    handleFileUpload( event ){
      this.image = event.target.files[0];
    },
  },
  validations: {
    form: {
      movie: {
        required,
        minLength: minLength(5)
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

<style type="text/css">
.fld-error .msg-error {
  display: block;
  color: #dc3545;
}
.msg-error {
  display: none;
}

</style>
