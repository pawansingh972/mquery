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
                  <b-button size="sm" v-on:click="addKeyValue" class="mt-3">add { key:value }</b-button><br>
                  <!-- Projections Key/Value pairs -->
                  <ol class="mt-4">
                    <li class="mb-4" v-for="(projection, index) in projections" :key="index">
                      <input v-model='p_keys[index]' :type="projection.type" name="" :id="'key-' + projection.index">
                      <input v-model='p_values[index]' class="ml-4 col-1" :type="projection.type" name="" :id="'value-' + projection.index">
                    </li>
                  </ol>
                  <b-button size="sm" v-on:click="addProjection" class="mt-3">add projections { key:value }</b-button><br><br>
                  <b-form-group class="mt-3" label="Prettify">
                    <b-form-radio-group id="prettify" v-model="prettify_selected" name="prettify">
                      <b-form-radio value="p_yes">Yes</b-form-radio>
                      <b-form-radio value="p_no">No</b-form-radio>
                    </b-form-radio-group>
                  </b-form-group>
                  <b-button size="sm" variant="primary" v-on:click="constructQuery" class="mt-3">GENERATE</b-button>
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
      p_index: 0,
      query: '',
      projectionQuery: '',
      needCollection: false,
      collection: '',
      keyValues: [],
      projections: [],
      keys: [],
      values: [],
      p_keys: [],
      p_values: [],
      prettify: '',
      prettify_selected: 'p_yes'
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

      if (this.keyValues && this.keys.length && this.values.length) {
        debugger
        for (let kv of this.keyValues) {
          if (this.keys[kv.index] && this.values[kv.index]) {
            this.keyValueQuery += this.keys[kv.index] + ': ' + '\'' + this.values[kv.index] + '\''
          }
          //! Multiple key values
          if ((kv.index + 1) !== this.keyValues.length && this.keys[kv.index + 1] && this.values[kv.index + 1]) {
            this.keyValueQuery += ', '
          }
        }
      }

      this.queryEnd = '}'

      //! Projections
      if (this.projections.length && this.p_keys.length && this.p_values.length) {
        this.projectionQuery = ', {'

        for (let projection of this.projections) {
          this.projectionQuery += this.p_keys[projection.index] + ': ' + this.p_values[projection.index]

          //! Multiple key values
          if (projection.index + 1 !== this.projections.length) {
            this.projectionQuery += ', '
          }
        }

        this.queryEnd += this.projectionQuery + ' }'
      }

      //! End of query
      this.queryEnd += ')'

      this.query = this.queryStart + this.keyValueQuery + this.queryEnd

      //! For prettify
      if (this.prettify_selected === 'p_yes') {
        this.query += '.pretty();'
      } else {
        this.query += ';'
      }
    },
    addKeyValue () {
      this.keyValues.push({index: this.index, type: 'text'})
      this.index++
    },
    addProjection () {
      this.projections.push({index: this.p_index, type: 'number'})
      this.p_index++
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
  .label-also {
    position: relative;
  }
</style>
