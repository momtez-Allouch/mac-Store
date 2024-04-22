<template>
  <a-layout>
    <a-layout-header
      :style="{
        position: 'fixed',
        zIndex: 1000,
        width: '100%',
        backgroundColor: '#CCD1D1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }"
    >
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="horizontal"
        :style="{
          lineHeight: '64px',
          backgroundColor: '#CCD1D1',
          width: '100%',
        }"
      >
        <a-menu-item key="1"
          ><div>
            <RouterLink to="/"
              ><img src="/logo.png" alt="" style="width: 100px"
            /></RouterLink></div
        ></a-menu-item>
        <a-menu-item key="1"
          ><RouterLink to="/"><b> Home</b></RouterLink></a-menu-item
        >
        <a-menu-item key="2"
          ><RouterLink to="/AddProductA"
            ><b> Ajouter pc</b>
          </RouterLink></a-menu-item
        >
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '30px 30px', marginTop: '74px' }">
      <RouterView />
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Momtez Allouch ©2024
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
const selectedKeys = ref();
</script>
