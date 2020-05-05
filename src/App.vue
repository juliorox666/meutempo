<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <Dashboard />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Dashboard from "./views/Dashboard";

export default {
  name: "App",
  components: {
    Dashboard
  },
  data: () => ({
    //
  })
};
</script>
