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
              <li class="breadcrumb-item active" aria-current="page">Create hall</li>
            </ol>
          </nav>
          <h1 class="h3 mb-3 mt-3 font-weight-normal">For creating hall enter hall name and size!</h1>
      <form @submit.prevent="createHall">
        <div class="row form-group">
          <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.hall_name.$error }">
            <div class="md-form mb-0">
        <label for="hall_name" class="sr-only">Hall name</label>
        <input id="hall_name" type="text" class="form-control" placeholder="Hall name"
               v-model="form.hall_name" @input="$v.form.hall_name.$touch">
        </div>
          <span class="msg-error" v-if="!$v.form.hall_name.required">
            <small>This field is required!</small>
          </span>
          <span class="msg-error" v-if="!$v.form.hall_name.minLength">
            <small>Length of symbols could be {{ $v.form.hall_name.$params.minLength.min }} or bigger!</small>
          </span>
        </div>
          <div class="col-md-6" v-bind:class="{'fld-error': $v.form.hall_size.$error}">
            <div class="md-form mb-0">
            <label for="hall_size" class="sr-only">Hall size</label>
            <input id="hall_size" type="number" class="form-control" placeholder="Hall size"
                   v-model="form.hall_size" @input="$v.form.hall_size.$touch">
            </div>
          <span class="msg-error" v-if="!$v.form.hall_size.required">
            <small>This field is required!</small>
          </span>
          <span class="msg-error" v-if="!$v.form.hall_size.integer">
            <small>Will be a number!</small>
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
  name: "create_hall",
  data() {
    return {
      message: self.message,
      title: 'Fill the form!',
      form: {
        hall_name: '',
        hall_size: 0
      }
    }
  },

  computed: {
    isCompleted() {
      return !this.$v.$invalid;
    },

  },
  methods: {
      async createHall() {
        try {
          let self = this;
          let response = await this.$axios.post('/cinema_halls/', {
            hall_name: this.form.hall_name,
            hall_size: this.form.hall_size
          }).then(response => {
            self.message = 'You are created a new hall!'
          })
          console.log(response)
          await this.$router.push('/create_hall/')

        }catch (err) {
          console.log(err)
        }
      }
    // createHall() {
    //   let createHallFormData = new FormData();
    //   createHallFormData.set("hall_name", this.form.hall_name);
    //   createHallFormData.set("hall_size", this.form.hall_size);
    //
    //   axios({
    //     method: "post",
    //     url: "/cinema_halls/",
    //     data: createHallFormData })
    //       .then(function (response) {
    //         console.log(response);
    //       }).catch(function (response) {
    //         console.log(response);
    //       })
    // }
  },
    validations: {
      form: {
        hall_name: {
          required,
          minLength: minLength(5)
        },
        hall_size: {
          required,
          integer
        }
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
