<script setup>
import { ref } from 'vue'

const pcs = ref([])
const loading = ref(false)

// export default {
//     data(){
//         return{
//             pcs:[]
//         }
//     }
// }
// onMounted(){
//     fetch('http://127.0.0.1:8787/api/pc')
//     .then(res => res.json)
//     .then(data => this.pcs= data)
// }

const fetchData = async () => {
  try {
    loading.value = true
    const response = await fetch('https://server.allouchmomtez0.workers.dev/api/pc', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    pcs.value = data

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données PC')
    }
    loading.value = false
  } catch (error) {
    message.error("Une erreur s'est produite lors de la récupération des données PC")
  }
}

const getFirstImage = (images) => {
  if (images) {
    const imageArray = images.split(';')
    return imageArray[0]
  }
  return 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' // Default image
}

fetchData()
</script>
<template>
  <a-spin v-if="loading"></a-spin>
  <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" v-for="(pc, index) in pcs" :key="index">
      <router-link :to="'/viewPc/?id=' + pc.numeroSerie">
        <div v-if="pc.vendu == '1'">
          <a-badge-ribbon text="VENDU" color="#475465">
            <a-card
              hoverable
              style="margin-bottom: 20px; background: linear-gradient(to left, #cacaca, #7ea0b7)"
            >
              <a-card-grid
                style="width: 100%; min-height: 280px; text-align: left"
                :hoverable="false"
              >
                <a-row>
                  <a-col :xs="24" :sm="6" :md="6" :lg="8" :xl="8" style="padding-right: 20px">
                    <img
                      alt="example"
                      :src="getFirstImage(pc.images)"
                      style="max-width: 100%; max-height: 140px"
                    />

                    <a-typography-title :level="3"
                      >Apple {{ pc.modele }} {{ pc.anneeSortie }}</a-typography-title
                    >

                    <a-typography-title :level="4">{{ pc.prix }} TND</a-typography-title>
                  </a-col>

                  <a-col :xs="24" :sm="18" :md="18" :lg="16" :xl="16">
                    <a-divider orientation="left" style="height: 2"
                      >processeur: {{ pc.processeur }}</a-divider
                    >

                    <a-divider orientation="left" style="height: 2"
                      >RAM : {{ pc.memoire }}</a-divider
                    >

                    <a-divider orientation="left" style="height: 2"
                      >Stockage : {{ pc.capaciteStockage }}</a-divider
                    >

                    <a-divider orientation="left" style="height: 2"
                      >Année de sortie : {{ pc.anneeSortie }}</a-divider
                    >

                    <a-divider orientation="left" style="height: 2"
                      >Etat : {{ pc.etat }}</a-divider
                    ></a-col
                  >
                </a-row>
              </a-card-grid>
            </a-card>
          </a-badge-ribbon>
        </div>
        <div v-else>
          <a-card
            hoverable
            style="margin-bottom: 20px; background: linear-gradient(to left, #cacaca, #7ea0b7)"
          >
            <a-card-grid
              style="width: 100%; min-height: 280px; text-align: left"
              :hoverable="false"
            >
              <a-row>
                <a-col :xs="24" :sm="6" :md="6" :lg="8" :xl="8" style="padding-right: 20px">
                  <img
                    alt="example"
                    :src="getFirstImage(pc.images)"
                    style="max-width: 100%; max-height: 140px"
                  />

                  <a-typography-title :level="3"
                    >Apple {{ pc.modele }} {{ pc.anneeSortie }}</a-typography-title
                  >
                  <a-typography-title :level="4">{{ pc.prix }} TND</a-typography-title>
                </a-col>

                <a-col :xs="24" :sm="18" :md="18" :lg="16" :xl="16"
                  ><a-divider orientation="left" style="height: 2"
                    >processeur: {{ pc.processeur }}</a-divider
                  >

                  <a-divider orientation="left" style="height: 2">RAM : {{ pc.memoire }}</a-divider>

                  <a-divider orientation="left" style="height: 2"
                    >Stockage : {{ pc.capaciteStockage }}</a-divider
                  >

                  <a-divider orientation="left" style="height: 2"
                    >Année de sortie : {{ pc.anneeSortie }}</a-divider
                  >

                  <a-divider orientation="left" style="height: 2"
                    >Etat : {{ pc.etat }}</a-divider
                  ></a-col
                >
              </a-row>
            </a-card-grid>
          </a-card>
        </div>
      </router-link>
    </a-col>
  </a-row>
</template>
