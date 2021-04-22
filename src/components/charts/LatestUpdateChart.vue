<template>
<div v-if="isLoading">
    <h1>Laddar!</h1>
    <br>
    <p>Laddar statistik, var god dröj...</p>
    <div class="progress">
      <div class="indeterminate"></div>
  </div>
</div>
<div v-else>
  <canvas id="newestDataChart"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    data(){
    return {
      isLoading: false,
      fetchData: {},
      labels: [],
      infected: [],
      deceased: [],
      intensiveCare: []
    }
  },
  created() {
 
  },
  mounted() {
    
    this.fetchFreshData();
    
    
  },
  methods: {
    fetchFreshData() {
      this.isLoading = true;
      this.axios.get('https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true')
        .then((data) => {
                this.fetchData = data.data;
                
                this.fetchData.infectedByRegion.forEach(item => {
                    this.labels.push(item.region)
                    this.infected.push(item.infectedCount)
                    this.deceased.push(item.deathCount)
                    this.intensiveCare.push(item.intensiveCareCount)
                });
                this.isLoading = false
        
                })
                .finally(() => this.drawChart())
        .catch((err) => {
          console.log(err);
          });
          this.drawChart()
      
    },
    drawChart(){
        
        const ctx = document.getElementById('newestDataChart').getContext('2d');
        
        let chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.labels,
                datasets: [{
                    label: "Infektioner",
                    backgroundColor: 'rgb(250, 147, 140)',
                    data: this.infected
                }, {
                    label: "Avlidna",
                    backgroundColor: 'rgb(255, 0, 0)',
                    data: this.deceased
                }, {
                    label: "Intensivvårdsfall",
                    backgroundColor: 'rgb(133, 0, 0)',
                    data: this.intensiveCare
                }]
            },
            options: {
            scales: {
              y: {
                  beginAtZero: true
            }
        }
    }
        });
        chart.render();   
    }
  }
}
</script>

<style lang="scss" scoped>

canvas {
    max-width: 1600px;
    height: auto;
}

</style>