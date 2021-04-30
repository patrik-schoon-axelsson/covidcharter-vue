<template>
  <div class="container">
    <h3>Historisk översikt</h3>
    <br>
    <p class="flow-text">Rikstäckande statistik för totalt anfall infektioner, innevarande månad. Använd filtret längre ner på sidan för att jämföra regioner under perioder.</p>
    <history-chart></history-chart>
  </div>
</template>

<script>
import HistoryChart from '@/components/charts/HistoryChart.vue';

export default {
  components: { HistoryChart },

}
</script>

<style>

</style>