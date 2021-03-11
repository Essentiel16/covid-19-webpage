import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'covidwebpage'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPost: {},
    europeRegion: [],
    allNation: {},
    loading: true
  },
  mutations: {
    setAllPost: (state, payload) => {
      state.allPost = payload
    },
    setAllNation: (state, payload) => {
      state.allNation = payload
    },
    setEuropeRegion: (state, payload) => {
      state.europeRegion = payload
    }
  },
  actions: {
    getAllPost (state) {
      const baseURL = 'https://covid-api.mmediagroup.fr/v1/cases'
      fetch(baseURL)
        .then(response => response.json())
        .then(data => {
          console.log(data.Global)
          console.log(Object.entries(data))
          state.commit('setAllPost', data)
        // .catch(error => console.log(error))
        })
    },
    getEuropeRegions (state) {
      const continentData = ['Europe', 'Americas', 'Asia', 'Africa', 'Oceania'].map(async (name) => {
        const data = await fetch(`https://covid-api.mmediagroup.fr/v1/cases?continent=${name}`)
        const response = await data.json()
        console.log(response)
        return response
      })
      Promise.all(continentData)
      continentData.forEach((e) => {
        getEuropeRegion.push(Object.entries(e))
        console.log(e)
      })
    }
  },
  getters: {
    getGlobalData: state => {
      return state.allPost.Global.All
    },
    getCountries: state => {
      const countries = Object.entries(state.allPost)
      return countries.filter((country) => country[0] !== 'Global')
    },
    getEuropeRegion: state => {
      return state.europeRegion
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
