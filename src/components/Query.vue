<template>
  <div class="query">
    <div id="header">
      <h4 class="text-center">m{query} - Your mongoDB query generator</h4>
    </div>
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
                  <!-- Key/Value pairs -->
                  <ol class="mt-4">
                    <li class="mb-4" v-for="(keyValue, index) in keyValues" :key="index">
                      <input v-model='keys[index]' :type="keyValue.type" name="" :id="'key-' + keyValue.index">
                      <input v-model='values[index]' class="ml-4" :type="keyValue.type" name="" :id="'value-' + keyValue.index">
                    </li>
                  </ol>
                  <b-button-group vertical>
                    <b-button size="sm" v-on:click="addKeyValue" class="mt-3">add { key:value }</b-button>
                    <b-button size="sm" variant="primary" v-on:click="constructQuery" class="mt-3">GENERATE</b-button>
                  </b-button-group>
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
      index: 0,
      query: '',
      needCollection: false,
      collection: '',
      keyValues: [],
      keys: [],
      values: []
    }
  },
  watch: {
    collection: function (value) {
      if (value === '') {
        this.query = ''
      }
    }
  },
  methods: {
    constructQuery () {
      if (this.collection === '') {
        this.needCollection = true
        return
      }

      this.needCollection = false
      this.queryStart = 'db.getCollection(\'' + this.collection + '\').find({'

      this.keyValueQuery = ''

      for (let kv of this.keyValues) {
        this.keyValueQuery += this.keys[kv.index] + ': ' + '\'' + this.values[kv.index] + '\''

        // Multiple key values
        if ((kv.index + 1) !== this.keyValues.length) {
          this.keyValueQuery += ', '
        }
      }

      this.queryEnd = '})'
      this.query = this.queryStart + this.keyValueQuery + this.queryEnd + '.pretty();'
    },
    addKeyValue () {
      this.keyValues.push({index: this.index, type: 'text'})
      this.index++
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
