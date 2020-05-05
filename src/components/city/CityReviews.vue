<template>
  <div class="city-reviews">
    <v-layout row wrap>
      <template v-for="item of listFiltered">
        <v-flex xs12 sm12 md6>
          <CardReview
            :key="item.id"
            :title="item.title"
            :description="item.description"
            :rate="item.rate"
            :icon="item.icon"
          />
        </v-flex>
      </template>
    </v-layout>
  </div>
</template>

<script>
import CardReview from "@/components/UI/CardReview";

export default {
  props: ["cityHistory"],
  components: {
    CardReview
  },
  data: () => ({
    list: [
      {
        id: 1,
        title: "Is good place to go to the beach?",
        description: "Based on history of the last days",
        good_value: 25,
        prop: "max_temp",
        icon: "mdi-thumb-up"
      },
      {
        id: 2,
        title: "Winter is coming?",
        description: "Based on history of the last days",
        prop: "min_temp",
        good_value: 5,
        icon: "mdi-thumb-down"
      }
    ],
    listFiltered: []
  }),
  methods: {
    calcRate(data, prop, good) {
      let length = data.length;
      let total = parseInt(data.reduce((a, c) => c[prop] + a, 0) / length);
      let diff = 0;
      if (total > good) {
        diff = total - good;
      } else {
        diff = good - total;
      }

      if (diff > 5) {
        return 1;
      } else {
        return 5 - diff;
      }
    },
    isGoodRate(diff) {
      return diff > 2 ? true : false;
    }
  },
  mounted() {
    this.listFiltered = this.list.map(l => {
      let result_rate = this.calcRate(this.cityHistory, l.prop, l.good_value);
      return {
        ...l,
        rate: result_rate,
        icon: this.isGoodRate(result_rate) ? "mdi-thumb-up" : "mdi-thumb-down"
      };
    });
  }
};
</script>

<style>
</style>