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
      collection: ''
    }
  },
  watch: { },
  methods: {
    constructQuery () {
      this.query = 'db.getCollection(\''+ this.collection +'\').find({});'
    }
  }
}
</script>

