<template>
  <div class="city-next-5" v-if="nextDays.length">
    <h4>Next fews days:</h4>
    <v-data-table :headers="headers" :items="items" hide-default-footer class="elevation-1">
      <template v-slot:item.min_temp="{ item }">{{ `${item.min_temp}` }} &deg;</template>
      <template v-slot:item.max_temp="{ item }">{{ `${item.max_temp}` }} &deg;</template>
      <template v-slot:item.humidity="{ item }">{{ `${item.humidity}` }} mph</template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "city-next-days",
  props: ["nextDays"],
  data: () => ({
    headers: [],
    items: []
  }),
  mounted() {
    this.headers = [
      { text: "Day", align: "center", value: "day" },
      { text: "Min temp.", align: "center", value: "min_temp" },
      { text: "Max temp.", align: "center", value: "max_temp" },
      { text: "Humidity", align: "center", value: "humidity" },
      { text: "Will be", align: "center", value: "weather_state_name" }
    ];

    this.items = this.nextDays.map(v => ({
      day: this.$moment(v.applicable_date).format("DD/MM/YYYY"),
      min_temp: `${Number(v.min_temp).toFixed(0)}`,
      max_temp: `${Number(v.max_temp).toFixed(0)}`,
      humidity: v.humidity,
      weather_state_name: v.weather_state_name
    }));
  }
};
</script>

<style>
</style>