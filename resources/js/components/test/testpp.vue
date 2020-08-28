<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8" id="app">
                <div class="card">
                    <div class="card-header">Dashboard Component</div>

                    <div class="card-body">
                        I'm an example component.
                        <test v-bind:artists="artists"/>
                        <test2 v-bind:artists="artists"/>
                    </div>
                </div>
            </div>
            <!-- <not-found></not-found> -->
           
        </div>
    </div>
</template>
<script>

import test from './test.vue'
import test2 from './test2.vue'

export default {
    components: {
        test,
        test2
    },
    data (){
    return {
      artists: [
       {name: 'Davido', genre: 'afrobeats', country: 'Nigeria'},
       {name: 'Burna Boy', genre: 'afrobeats', country: 'Nigeria'},
       {name: 'AKA', genre: 'hiphop', country: 'South-Africa'},
       {name: 'Sarkodie', genre: 'hiphop', country: 'Ghana'},
       {name: 'Stormzy', genre: 'hiphop', country: 'United Kingdom'},
       {name: 'Lil Nas', genre: 'Country', country: 'United States'},
       {name: 'Nasty C', genre: 'hiphop', country: 'South-Africa'},
       {name: 'Shatta-walle', genre: 'Reagae', country: 'Ghana'},
       {name: 'Khalid', genre: 'pop', country: 'United States'},
       {name: 'ed-Sheeran', genre: 'pop', country: 'United Kingdom'}
      ]
    }
  },
  mounted() {
    console.log('Component mounted.')
    }
}
</script>
