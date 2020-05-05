<template>
  <div class="city-graph">
    <v-layout row wrap>
      <v-flex xs12>
        <h4>History of last days:</h4>
      </v-flex>
      <v-flex xs12>
        <line-chart :height="320" :chart-data="chartdata" :options="options"></line-chart>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LineChart from "@/hooks/LineChart.js";

export default {
  components: {
    LineChart
  },
  props: ["labels", "min_temps", "max_temps"],
  data: () => ({
    chartdata: {},
    options: {}
  }),
  mounted() {
    this.chartdata = {
      labels: this.labels,
      datasets: [
        {
          label: "Max temp",
          borderColor: "#d85959",
          pointBackgroundColor: "white",
          borderWidth: 2,
          pointBorderColor: "#d85959",
          backgroundColor: "transparent",
          data: this.max_temps
        },
        {
          label: "Min temp",
          borderColor: "#387ae0",
          pointBackgroundColor: "white",
          borderWidth: 2,
          pointBorderColor: "#387ae0",
          backgroundColor: "transparent",
          data: this.min_temps
        }
      ]
    };
    this.options = {
      scales: {
        yAxes: [
          {
            ticks: {
              // beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: true
            }
          }
        ]
      },
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    };
  }
};
</script>

<style>
</style>