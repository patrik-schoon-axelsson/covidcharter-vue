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
  <br>
  <div class="row">
    <base-datepicker name="minDate" placeholder="Första datum"></base-datepicker>
    <base-datepicker name="maxDate" placeholder="Sista datum"></base-datepicker>
  </div>
  <button @click="filterFetchedData">Log filters </button>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import Chart from 'chart.js/auto';
import BaseDatepicker from '@/components/base/BaseDatepicker.vue';


export default {
    name: 'History Chart',
    components: { BaseDatepicker },
    data(){
    return {
      isLoading: false,
      fetchData: {},
      dateObjs: [],
      filterArray: [],
      chart: null
    }
  },
  computed: {
      minDate(){
        return this.$store.getters.getMinDate;
      },
      maxDate(){
        return this.$store.getters.getMaxDate;
      },
      sortedDates(){
        // Filters for items from this month. Filters out entries that have no statistics.
        
        let thisMonth = new Date().getMonth();
        let thisYear = new Date().getFullYear();
        
        return this.dateObjs.filter((item) => item.date.getMonth() == thisMonth && item.date.getFullYear() == thisYear && item.infected > 0); 
      },
  },
  created(){

  },
  mounted() {    
    this.fetchFreshData();
  },
  methods: {
    ...mapMutations({
        filterMin: 'filterMinDate',
        filterMax: 'filterMaxDate'
    }),
    fetchFreshData() {
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
        
        this.chart = new Chart(ctx, {
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

        this.chart.render();   
    },
    redrawChart(filteredData) {
      const ctx = document.getElementById('newestDataChart').getContext('2d');
      this.chart.destroy();

      this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: filteredData.map(i => new Date(i.lastUpdatedAtApify).toLocaleDateString('sv-SE')),
                datasets: [{         
                    label: 'Infektioner',
                    backgroundColor: 'rgb(250, 147, 140)',
                    data: filteredData.map(i => i.infected)
                  },
                  {
                    label: 'Avlidna',
                    backgroundColor: 'rgb(255, 0, 0)',
                    data: filteredData.map(i => i.deceased)
                  },
                  {
                    label: 'Intensivvård',
                    backgroundColor: 'rgb(133, 0, 0)',
                    data: filteredData.map(i => i.intensiveCare)
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
                    text: `Statistik för perioden ${this.minDate} till ${this.maxDate}`
                  }
                }
              }
      });
      
      
      this.chart.render();
    },
    filterFetchedData() {
      let maxFilterDate = new Date(this.maxDate).getTime()
      let minFilterDate = new Date(this.minDate).getTime()

      this.filterArray = this.fetchData.filter((item) => (new Date(item.lastUpdatedAtApify).getTime() <= maxFilterDate) && (new Date(item.lastUpdatedAtApify).getTime() >= minFilterDate)); 

      this.redrawChart(this.filterArray);
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