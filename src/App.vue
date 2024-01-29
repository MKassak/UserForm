<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <!-- Logo header -->
    <img
      src="https://h8v7k6i3.rocketcdn.me/wp-content/themes/strategyquant/static/img/logo-strategy-quant-v2.svg"
      width="235"
      height="74"
      alt="StrategyQuant"
      class="p-8"
    />
  </header>

  <RouterView class="router-view" />
</template>
