<template>
<div v-if="isLoading">
    <h1>Laddar!</h1>
    <br>   
    <div class="progress">
      <div class="indeterminate"></div>
  </div>
  <p>Laddar historisk statistik, var god dröj... (Detta kan ta en liten stund!)</p>
</div>
<div v-else>
  <canvas id="newestDataChart"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'History Chart',
    data(){
    return {
      isLoading: false,
      fetchData: {},
      labels: [],
      dateObjs: []
    }
  },
  computed: {
      sortedDates(){
        
        // Filters for items from this month. Filters out entries that have no statistics.
        
        let thisMonth = new Date().getMonth();
        let thisYear = new Date().getFullYear();
        
        return this.dateObjs.filter((item) => item.date.getMonth() == thisMonth && item.date.getFullYear() == thisYear && item.infected > 0); 
      },
  },
  mounted() {    
    
    this.fetchFreshData();
    
  },
  methods: {
    async fetchFreshData() {
      this.isLoading = true;
      
      this.axios.get('https://api.apify.com/v2/datasets/Nq3XwHX262iDwsFJS/items?format=json&clean=1')
        .then((data) => {
                
                this.fetchData = data.data;

                this.fetchData.forEach(item => {
                    let dateItem = {
                        date: new Date(item.lastUpdatedAtApify),
                        infected: item.infected
                    }

                  this.dateObjs.push(dateItem);

                  this.dateObjs.sort((a, b) => {
                      // Sorting all entries to be descending.
                     return new Date(a.date) - new Date(b.date);
                  });
                });
              })
        .then(() => this.isLoading = false)
        .finally(() => {
          this.drawChart();
        })
        .catch((err) => {
          console.log(err);
          });
    },
    drawChart() {
        
        const ctx = document.getElementById('newestDataChart').getContext('2d');
        
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.sortedDates.map(i => i.date.toLocaleDateString('sv-SE')),
                datasets: [{         
                    label: 'Infektioner',
                    backgroundColor: 'rgb(250, 147, 140)',
                    data: this.sortedDates.map(i => i.infected)
                  }]
            },
             options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  title: {
                    display: true,
                    text: 'Infektionsiffror, innevarande månad.'
                  }
                }
              }
          });

        chart.render();   
    },
  }
}
</script>

<style lang="scss" scoped>

canvas {
    max-width: 1600px;
    height: auto;
}

</style>