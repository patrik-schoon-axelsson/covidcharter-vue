<template>
  <div class="col s12 m6">
    <input :value="[this.name == 'minDate' ? this.getMinDate : this.getMaxDate ]" type="text" :name="name" :placeholder="placeholder" class="datepicker" @change="setDateState">
  </div>
  
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import M from 'materialize-css';

export default {
    name: 'Datepicker',
    props: ['placeholder', 'name'],
    data(){
        return {
            inputDate: ''
        }
    },
    mounted() {
      M.AutoInit();
    },
    methods: {
    setDateState(event){
      if(this.name == 'minDate'){
        console.log(event.target.value)
        this.filterMin(event.target.value)
      } else if (this.name == 'maxDate') {
        console.log(event.target.value)
        this.filterMax(event.target.value)
      }
    },
    ...mapMutations({
        filterMin: 'filterMinDate',
        filterMax: 'filterMaxDate'
      }),
    },
    computed: {
      ...mapGetters([
        'getMinDate',
        'getMaxDate'
      ])
    }
}

</script>

<style>


</style>