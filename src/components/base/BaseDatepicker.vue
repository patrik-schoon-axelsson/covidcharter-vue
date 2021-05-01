<template>
  <div class="input-field col s12 m6">
    <i class="material-icons prefix">date_range</i>
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
      // Setting up the datepicker on mount, with custom options.
      M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        autoClose: true,
        format: 'm-dd-yyyy',
        minDate: new Date('3-15-2020'),
        maxDate: new Date(),
      });
    },
    methods: {
    setDateState(event){
      if(this.name == 'minDate'){
        this.filterMin(event.target.value)
      } else if (this.name == 'maxDate') {
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