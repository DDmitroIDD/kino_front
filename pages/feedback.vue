<template>
  <div>
    <Header :head_for_feet="title" />
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <nav aria-label="breadcrumb" class="mt-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="">Main</a></li>
              <li class="breadcrumb-item active" aria-current="page">Feedback</li>
            </ol>
          </nav>
          <p class="lead">If you want to contact me fill the form!</p>
          <form name="contact-form">
            <div class="row">
              <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.name.$error }">
                <div class="md-form mb-0">
                  <label for="name" class="sr-only">Your name</label>
                  <input type="text" id="name" class="form-control" placeholder="Your name" v-model="form.name"
                         @input="$v.form.name.$touch">
                </div>
                <span class="msg-error" v-if="!$v.form.name.required">
                  <small>This field is required!</small>
                </span>
                <span class="msg-error" v-if="!$v.form.name.minLength">
                  <small>Length of symbols could be {{ $v.form.name.$params.minLength.min }} or bigger!</small>
                </span>
              </div>
              <div class="col-md-6" v-bind:class="{ 'fld-error': $v.form.email.$error}">
                <div class="md-form mb-0">
                  <label for="email" class="sr-only">Your email</label>
                  <input type="email" id="email" class="form-control" placeholder="Your email" v-model="form.email"
                         @input="$v.form.email.$touch">
                </div>
                <span class="msg-error" v-if="!$v.form.email.required">
                  <small>This field is required!</small>
                </span>
                <span class="msg-error" v-if="!$v.form.email.minLength">
                  <small>This email is not correct! Correct email could be like name@domain.xx</small>
                </span>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-12" v-bind:class="{ 'fld-error': $v.form.subject.$error}">
                <div class="md-form mb-0">
                  <label for="subject" class="sr-only">Subject</label>
                  <input type="text" id="subject" class="form-control" placeholder="Subject" v-model="form.subject"
                         @input="$v.form.subject.$touch">
                </div>
                <span class="msg-error" v-if="!$v.form.subject.required">
                  <small>This field is required!</small>
                </span>
                <span class="msg-error" v-if="!$v.form.subject.minLength">
                  <small>Length of symbols could be {{ $v.form.subject.$params.minLength.min }} or bigger!</small>
                </span>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-12" v-bind:class="{ 'fld-error': $v.form.message.$error}">
                <div class="md-form">
                  <label for="message" class="sr-only">Your message!</label>
                  <textarea id="message" rows="2" class="form-control md-textarea"
                            placeholder="Your message" v-model="form.message"
                            @input="$v.form.message.$touch"></textarea>
                </div>
                <span class="msg-error" v-if="!$v.form.message.required">
                  <small>This field is required!</small>
                </span>
              </div>
            </div>
          </form>
          <div class="text-center text-md-left mt-3">
            <button class="btn btn-primary" type="submit" @click.prevent="submitForm"
            :disabled="!isCompleted">Sent</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  components: {Header},
  layout: "movie_detail",
  data() {
    return {
      title: "Writing for me!",
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",

      }
    }
  },
  methods: {
    submitForm() {
      let contactFormData = new FormData();
      contactFormData.set("name", this.form.name);
      contactFormData.set("email", this.form.email);
      contactFormData.set("subject", this.form.subject);
      contactFormData.set("message", this.form.message);
      console.log("Submitting data...");
      axios({
        method: "post",
        url: "http://localhost:8000/feedback/",
        data: contactFormData
      }).then(function (response) {
        console.log(response);
      }).catch(function (response) {
        console.log(response);
      });
      this.$router.push("/success")
    }
  },
  computed: {
    isCompleted () {
      // return this.form.name && this.form.message && this.form.subject && this.form.email;
      return !this.$v.$invalid;
    }

  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      subject: {
        required,
        minLength: minLength(10)
      },
      message: {
        required
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
