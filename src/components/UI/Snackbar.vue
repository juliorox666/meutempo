<template>
  <div class="snackbar">
    <v-snackbar v-model="snackbarStatus" :color="color" :timeout="timeout">
      {{ text }}
      <v-btn icon @click="snackbarStatus = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["color", "timeout", "text"],
  computed: {
    ...mapGetters(["openSnackbar"]),
    snackbarStatus: {
      get() {
        return this.openSnackbar;
      },
      set(val) {
        this.setOpenSnackbar(val);
      }
    }
  },
  methods: {
    ...mapActions(["setOpenSnackbar"])
  }
};
</script>

<style>
</style>