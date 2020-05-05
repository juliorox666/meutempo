<template>
  <div class="card-review">
    <v-card color="#F9F9F9">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-layout row wrap align-center>
          <v-flex xs12 sm12 md6 text-center>
            <v-rating v-model="rate"></v-rating>
          </v-flex>
          <v-flex xs12 sm12 md3 text-center>
            <v-icon>{{ icon }}</v-icon>
          </v-flex>
          <v-flex xs12 sm12 md3 text-center>
            <v-avatar color="primary" size="60">
              <span class="white--text headline">{{ `${rate}/5` }}</span>
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "rate", "icon"]
};
</script>

<style>
</style>