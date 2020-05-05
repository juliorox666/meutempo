<template>
  <div class="city-day-info">
    <v-card color="#F9F9F9">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ city_info.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-2" cols="7">{{ `${the_temp}&deg;C` }}</v-col>
          <v-col cols="5">
            <v-img aspect-ratio="1" :src="state_name_icon" contain></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <div>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Humidity: {{ city_info.humidity }} %</v-list-item-title>
              <v-list-item-subtitle>Max temp: {{ city_info.max_temp.toFixed(0) }} &deg;C</v-list-item-subtitle>
              <v-list-item-subtitle>Min temp: {{ city_info.min_temp.toFixed(0) }} &deg;C</v-list-item-subtitle>
              <v-list-item-subtitle>Wind speed: {{ city_info.wind_speed.toFixed(2) }} mph</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["city_info"]),
    description() {
      let day = this.$moment(this.city_info.time).format("ddd");
      let time = this.$moment(this.city_info.time)
        .format("hh:mm a")
        .toUpperCase();
      return `${day}, ${time}, ${this.city_info.weather_state_name}`;
    },
    the_temp() {
      return Number(this.city_info.the_temp).toFixed(0);
    },
    state_name_icon() {
      const dict = [
        "cloudy,",
        "cloud,",
        "dust,",
        "hail,",
        "fog,",
        "hot,",
        "hurricane",
        "lightning",
        "meteor",
        "na",
        "rain",
        "raindrop",
        "raindrops",
        "refresh",
        "sandstorm",
        "showers",
        "sleet",
        "smog",
        "smoke",
        "snow",
        "starts",
        "sunrise",
        "sunset",
        "thunderstorm",
        "tornado",
        "tsunami",
        "windy"
      ];
      let icon = `wi-na`;
      if (this.city_info.weather_state_name.toLowerCase() == `clear`) {
        icon = `wi-stars`;
      } else {
        let words = this.city_info.weather_state_name.split(" ");
        words.forEach(w => {
          let _w = w.trim().toLowerCase();
          if (dict.indexOf(_w) !== -1) {
            icon = `wi-${_w}`;
          }
        });
      }

      const url = require(`@/static/icons/${icon}.svg`);
      return url;
    }
  }
};
</script>

<style lang="stylus"></style>