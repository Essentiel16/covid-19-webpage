<template>
  <div class="home">
      <h1 class="welcome">{{msg}}</h1>
    <div class="data-info">
      <h1 v-if="loading">Loading...</h1>
      <div class="covid-data" >
        <h3>Total Confirmed: {{globalData.confirmed}}</h3>
        <p>Total Recovered: {{globalData.recovered}}</p>
        <p>Total Deaths: {{globalData.deaths}}</p>
      </div>
      <br>
      <div>
        <h3>Total Cases in Europe: {{europeRegion.confirmed}}</h3>
        <h3>Total Cases in America: {{europeRegion}}</h3>
        <h3>Total Cases in Asia: {{europeRegion}}</h3>
        <h3>Total Cases in Africa: {{europeregion}}</h3>
        <h3>Total Cases in Oceania: {{europeregion}}</h3>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>Country</td>
              <td>Confirmed Cases</td>
              <td>Recoveries</td>
              <td>Deaths</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(country, index) in countries" :key="index">
              <td>{{country[0]}}</td>
              <td>{{country[1].All.confirmed}}</td>
              <td>{{country[1].All.recovered}}</td>
              <td>{{country[1].All.deaths}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to the HomePage',
      loading: true,
      allPost: {}
    }
  },
  mounted () {
    this.getAllPost()
    this.getEuropeRegions()
  },
  methods: {
    ...mapActions({
      getAllPost: 'getAllPost',
      getEuropeRegions: 'getEuropeRegions'
    })
  },
  computed: {
    ...mapGetters({
      countries: 'getCountries',
      globalData: 'getGlobalData',
      europeRegion: 'getEuropeRegion'
    })
  }
}
</script>
<style scoped>
.data-info{
  display: grid;
  justify-content: center;
  align-content: center;
  margin-top: 25px;
}
.covid-data{
border: 1px solid #333333;
border-radius: 6px;
padding:16px;
}
.welcome{
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  text-shadow: 3px 6px rgba(255, 255, 255, 0.25);
}
.total-countries{
  margin: auto;
}
.total-countries tr{
  display: flex;
  gap: 30px;
  justify-content: center;
  align-content: center;
  padding: 10px;
}
</style>
