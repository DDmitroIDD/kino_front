<template>
  <div>
    <Header :movie_title="title" />
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <nav aria-label="breadcrumb" class="mt-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><nuxt-link to="/">Main</nuxt-link></li>
              <li class="breadcrumb-item active" aria-current="page">Feedback</li>
            </ol>
          </nav>
          <p class="lead">Your latter is send. Thank you!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {Header},
  layout: "movie_detail",
  name: "success",
  data() {
    return {
      title: "Tanks for your contacting!"
    }
  }
}
</script>

<style scoped>

</style>
