<template>
  <div class="query">
    <h3 class="mt-1 text-center">m{query} - Your mongoDB query generator</h3>
    <b-container fluid class="mt-5">
      <b-row>
          <b-col>
            <!-- Query Container -->
            <b-container>
              <b-row>
                <b-col>
                  <h3>Collection</h3>
                  <b-form-input
                    v-model="collection"
                    class="collection"
                    v-bind:class="{ 'nodata': needCollection }"
                    type="text"
                    placeholder="Enter your collection">
                  </b-form-input>

                  <b-button
                    size="sm"
                    variant="primary"
                    v-on:click="constructQuery"
                    class="mt-3">
                    GENERATE
                  </b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
          <b-col>
            <b-container>
              <b-row>
                <h3>Query</h3>
                <b-form-textarea id="query"
                      v-model="query"
                      placeholder="Query"
                      :rows="3"
                      :max-rows="6">
                </b-form-textarea>
              </b-row>
            </b-container>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'query',
  data () {
    return {
      query: '',
      needCollection: false,
      collection: ''
    }
  },
  watch: { },
  methods: {
    constructQuery () {
      if (this.collection === '') {
        this.needCollection = true
        return
      }

      this.needCollection = false
      this.query = 'db.getCollection(\'' + this.collection + '\').find({});'
    }
  }
}
</script>

<style scoped>
  .collection.nodata {
    border-color: #dc3545;
  }
  .collection.nodata:focus {
    box-shadow: 0 0 0 0.2rem rgba(220,53,69,.25);
  }
</style>
