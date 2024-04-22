<script setup>
import { ref, onMounted, watchEffect, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const route = useRoute()
const router = useRouter()
const id = ref(route.query.id)
const pc = ref({})
const images = ref([])
const loading = ref(false)

onMounted(() => {
  // fetchData()
  watchEffect(async () => {
    try {
      loading.value = true
      const response = await fetch(
        `https://server.allouchmomtez0.workers.dev/api/pc/?id=${id.value}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des détails du PC')
      }
      const data = await response.json()
      pc.value = data
      const imagesString = pc.value[0].images
      images.value = imagesString.split(';')
      loading.value = false
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération des données PC :", error)
      message.error("Une erreur s'est produite lors de la récupération des détails du PC")
      router.push('/notFound')
    }
  })
})

const updatePc = () => {
  router.push(`/updateProduct/?id=${id.value}`)
}
</script>

<template>
  <a-divider orientation="left">Détails PC</a-divider>

  <a-row>
    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-bottom: 30px">
      <a-spin v-if="loading"></a-spin>
      <div v-else>
        <a-carousel arrows dots-class="slick-dots slick-thumb">
          <template #customPaging="props">
            <a v-for="item in images" :key="item">
              <img :src="item" />
            </a>
          </template>
          <div v-for="item in images" :key="item">
            <center>
              <a-image :src="item" style="height: 400px" />
            </center>
          </div>
        </a-carousel>
      </div>
    </a-col>

    <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <div style="text-align: right">
        <a-button type="primary" ghost @click="updatePc">Modifier ce PC</a-button>
      </div>
      <br />

      <div>
        <a-typography-title :level="3">
          Apple {{ pc[0] ? pc[0].modele : '' }} {{ pc[0] ? pc[0].anneeSortie : '' }}
        </a-typography-title>
        <div style="margin-bottom: 8px">
          <a-typography-title :level="5" style="display: inline">prix: </a-typography-title>
          <a-typography-title :level="3" style="display: inline"
            >{{ pc[0] ? pc[0].prix : '' }} TND</a-typography-title
          >
        </div>
      </div>

      <a-divider orientation="right" style="border-color: #7ea0b7; color: #7ea0b7"
        >Spécifications techniques</a-divider
      >
      <table style="width: 80%; border-collapse: collapse">
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Année de sortie :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5">
              {{ pc[0] ? pc[0].anneeSortie : '' }}</a-typography-title
            >
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Processeur : </a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5"> {{ pc[0] ? pc[0].processeur : '' }}</a-typography-title>
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Mémoire :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5"> {{ pc[0] ? pc[0].memoire : '' }}</a-typography-title>
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Capacité de stockage :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5">
              {{ pc[0] ? pc[0].capaciteStockage : '' }}</a-typography-title
            >
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Couleur :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5"> {{ pc[0] ? pc[0].couleur : '' }}</a-typography-title>
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Taille écran (pouces) :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5">
              {{ pc[0] ? pc[0].tailleEcran : '' }}</a-typography-title
            >
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">cycles de Batterie :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5">
              {{ pc[0] ? pc[0].cycleBatterie : '' }}</a-typography-title
            >
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Type du langue clavier :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5">
              {{ pc[0] ? pc[0].typeLangueClavier : '' }}</a-typography-title
            >
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Touch Bar :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5"> {{ pc[0] ? pc[0].touchBar : '' }}</a-typography-title>
          </td>
        </tr>
        <tr>
          <td>
            <a-typography-text keyboard :level="2">Etat :</a-typography-text>
          </td>
          <td style="text-align: right; padding: 8px">
            <a-typography-title :level="5"> {{ pc[0] ? pc[0].etat : '' }}</a-typography-title>
          </td>
        </tr>
      </table>

      <a-typography-title :level="5"
        >Description : <br />{{
          pc[0] ? pc[0].description : '--pas de decription--'
        }}</a-typography-title
      >
      <!-- </div> -->
    </a-col>
  </a-row>
</template>

<style scoped>
/* For demo */
:deep(.slick-dots) {
  position: relative;
  height: auto;
}
:deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
:deep(.slick-arrow) {
  display: none !important;
}
:deep(.slick-thumb) {
  bottom: 0px;
}
:deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
:deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
:deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
.fixed-height-column {
  max-height: 490px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding-left: 5%;

  border-top-left-radius: 20px;
}

.scrollable-content {
  padding-right: 20px;
}

.mb-3 {
  margin-bottom: 1.5rem;
}
tr {
  border-bottom: 1px solid #ccc;
}
td {
  text-align: left;
  padding: 8px;
}
</style>
