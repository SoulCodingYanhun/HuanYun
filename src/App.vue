<template>
  <v-app>
    <header>
      <v-app-bar :elevation="0">
        <v-app-bar-title class="text-gradient"><span class="text-gradient">幻云科技</span></v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-heart"></v-btn>

          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
</script>

<style>
.text-gradient {
  background: linear-gradient(to right, rgb(235 125 247), rgb(0, 213, 255));
  -webkit-background-clip: text;
  color: transparent;
  /* font-size: 2em; */
}
</style>
