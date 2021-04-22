<template>
  <div class="col s12 m6">
    <input v-model.lazy="inputDate" type="text" :name="name" :placeholder="placeholder" class="datepicker">
  </div>
  
</template>

<script>
import M from 'materialize-css';

export default {
    name: 'Datepicker',
    props: ['placeholder', 'name'],
    data(){
        return {
            inputDate: null
        }
    },
    mounted() {

        M.AutoInit();

    }
}

</script>

<style>


</style>