<template>
  <div class="dashboard">
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <v-form
            class="form-city"
            ref="formCity"
            v-model="valid"
            :lazy-validation="lazy"
            @submit.prevent
          >
            <v-container grid-list-md>
              <v-layout row wrap justify-space-between>
                <v-flex class="box-city" xs12 sm12 md10>
                  <v-text-field
                    v-model="currentCity"
                    label="Search weather of (city) ..."
                    :rules="[v => !!v || 'City is required']"
                    required
                    outlined
                    @keyup.13="search"
                  ></v-text-field>
                </v-flex>
                <v-flex class="box-btn" xs12 sm12 md2>
                  <v-btn
                    :loading="isWaiting"
                    :disabled="!valid"
                    :block="true"
                    color="success"
                    class="mr-4"
                    height="56"
                    @click="search"
                  >Search</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-md>
            <div class="results" v-if="hasResults && !isWaiting">
              <v-layout row wrap>
                <v-flex xs12 sm6 md3>
                  <CityDayInfo />
                </v-flex>
                <v-flex xs12 sm6 md9>
                  <CityGraph :labels="labels" :max_temps="max_temps" :min_temps="min_temps" />
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <CityReviews :city-history="cityHistory" />
                </v-flex>
                <v-flex xs12>
                  <CityNextDays :nextDays="nextDays" />
                </v-flex>
              </v-layout>
            </div>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Message from the bottom -->
    <Snackbar :color="color" :timeout="timeout" :text="text" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Snackbar from "@/components/UI/Snackbar";
import CityDayInfo from "@/components/city/CityDayInfo";
import CityGraph from "@/components/city/CityGraph";
import CityNextDays from "@/components/city/CityNextDays";
import CityReviews from "@/components/city/CityReviews";

export default {
  name: "dashboard",
  components: {
    CityDayInfo,
    CityGraph,
    CityNextDays,
    CityReviews,
    Snackbar
  },
  data: () => ({
    hasResults: false,
    isWaiting: false,
    valid: true,
    lazy: false,
    currentCity: "",
    text: "",
    color: "",
    timeout: 4000,
    labels: [],
    min_temps: [],
    max_temps: [],
    nextDays: [],
    cityHistory: []
  }),
  methods: {
    ...mapActions(["setCityInfo", "setOpenSnackbar"]),
    getLS(label) {
      let ls = window.localStorage.getItem(label);
      if (ls) {
        return JSON.parse(ls);
      }
      return false;
    },
    setLS(label, data) {
      window.localStorage.setItem(label, JSON.stringify(data));
    },
    async search() {
      this.isWaiting = true;
      this.hasResults = false;
      try {
        if (this.$refs.formCity.validate()) {
          const response = await this.getCityWoeid();
          if (response !== undefined) {
            let { woeid } = response;
            await this.getCityDayInfo(woeid);
            await this.getCityLastDays(woeid);
            this.hasResults = true;
          } else {
            this.text = "City not found.";
            this.color = "info";
            this.setOpenSnackbar(true);
          }
        }
        this.isWaiting = false;
      } catch (error) {
        this.text =
          "Something went wrong. Try again, if the problem persist contact the admin.";
        this.color = "error";
        this.setOpenSnackbar(true);
        this.isWaiting = false;
      }
    },
    async getCityWoeid() {
      let city = this.currentCity;
      const { data } = await this.$axios.get(`/location/search/?query=${city}`);
      return data[0];
    },
    async getCityDayInfo(woeid) {
      let ls_day_info = this.getLS(`day_info_${woeid}`);
      let result = null;
      if (ls_day_info) {
        result = ls_day_info;
      } else {
        const { data } = await this.$axios.get(`/location/${woeid}/`);
        result = data;
        this.setLS(`day_info_${woeid}`, result);
      }
      const { time, title, consolidated_weather } = result;
      const {
        the_temp,
        weather_state_name,
        max_temp,
        min_temp,
        wind_speed,
        humidity
      } = consolidated_weather[0];
      this.setCityInfo({
        title,
        time,
        weather_state_name,
        the_temp,
        max_temp,
        min_temp,
        humidity,
        wind_speed
      });
      this.nextDays = consolidated_weather;
      return result;
    },
    async getCityLastDays(woeid) {
      let [month, day, year] = new Date().toLocaleDateString().split("/"); // example: 9/25/2019
      let ls_last_days = this.getLS(`last_days_${woeid}`);
      let result = null;
      if (ls_last_days) {
        result = ls_last_days;
      } else {
        const { data } = await this.$axios.get(
          `/location/${woeid}/${year}/${month}/${day}/`
        );
        result = data;
        this.setLS(`last_days_${woeid}`, result);
      }
      this.cityHistory = result;
      this.labels = result
        .sort((a, b) =>
          new Date(a.created).getTime() > new Date(b.created).getTime() ? 1 : -1
        )
        .map(v =>
          this.$moment(new Date(v.created).getTime()).format("DD/MM/YYYY HH:mm")
        );
      this.max_temps = result
        .sort((a, b) =>
          new Date(a.created).getTime() > new Date(b.created).getTime() ? 1 : -1
        )
        .map(v => Number(v.max_temp).toFixed(0));
      this.min_temps = result
        .sort((a, b) =>
          new Date(a.created).getTime() > new Date(b.created).getTime() ? 1 : -1
        )
        .map(v => Number(v.min_temp).toFixed(0));
      return result;
    }
  }
};
</script>

<style lang="stylus">
@import '~@/assets/stylus/dashboard.styl';
</style>