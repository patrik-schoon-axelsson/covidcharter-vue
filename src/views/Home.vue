<template>
  <div class="container">
    <h3 class="center-align">COVID statistik</h3>
    <br>
    <p class="flow-text">Sammanfattning av samtliga COVID-19 fall i Sverige, till dagens datum ({{ date }}), statistik samlad från <a href="https://apify.com/covid-19" target="_blank">denna COVID-API</a>.</p>
    <latest-update-chart></latest-update-chart>
  </div>
</template>

<script>
import LatestUpdateChart from "@/components/charts/LatestUpdateChart.vue";

export default {
  components: { LatestUpdateChart },
  name: "Home",
  data(){
    return {
      date: new Date(Date.now()).toLocaleDateString('sv-SE')
    }
  }
};
</script>
