<script setup>
import { ref, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const id = route.query.id;
let images = [];
const loading = ref(false);
const Submittingloading = ref(false);

const onFinish = async (values) => {
  if (id) {
    //modifier
    try {
      Submittingloading.value = true;
      const response = await fetch(
        `https://server.allouchmomtez0.workers.dev/api/pc/?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du PC");
      }

      message.success("PC modifiée avec succés");
      router.push("/");
    } catch (error) {
      console.log(error);
      message.error("Une erreur s'est produie");
    }
  } else {
    //ajouter

    try {
      Submittingloading.value = true;
      const response = await fetch(
        "https://server.allouchmomtez0.workers.dev/api/pc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du PC");
      }

      message.success("PC ajoutée avec succés");
      router.push("/");
    } catch (error) {
      message.error("Une erreur s'est produie");
    }
  }
};

const onFinishFailed = (errorInfo) => {
  message.error("Une erreur s'est produie");
};
const labelCol = {
  style: {
    width: "150px",
  },
};
const wrapperCol = {
  span: 16,
};

const formState = reactive({
  numeroSerie: "",
  modele: "",
  anneeSortie: "",
  processeur: "",
  memoire: "",
  etat: "",
  couleur: "",
  capaciteStockage: "",
  typeLangueClavier: "",
  tailleEcran: "",
  cycleBatterie: "",
  touchBar: "",
  description: "",
  images: images,
  prix: "",
  vendu: "",
});

const fetchPcDetails = async (id) => {
  try {
    const response = await fetch(
      `https://server.allouchmomtez0.workers.dev/api/pc/?id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des détails du PC");
    }

    const data = await response.json();
    formState.numeroSerie = data[0].numeroSerie;
    formState.modele = data[0].modele;
    formState.anneeSortie = data[0].anneeSortie;
    formState.processeur = data[0].processeur;
    formState.memoire = data[0].memoire;
    formState.etat = data[0].etat;
    formState.couleur = data[0].couleur;
    formState.capaciteStockage = data[0].capaciteStockage;
    formState.typeLangueClavier = data[0].typeLangueClavier;
    formState.tailleEcran = data[0].tailleEcran;
    formState.cycleBatterie = data[0].cycleBatterie;
    formState.touchBar = data[0].touchBar;
    formState.description = data[0].description;
    formState.images = data[0].images;
    formState.prix = data[0].prix;
    if (data[0].vendu == 1) {
      formState.vendu = true;
    } else {
      formState.vendu = false;
    }
  } catch (error) {
    message.error(
      "Une erreur s'est produite lors de la récupération des détails du PC"
    );
    router.push("/notFound");
  }
};

if (id) {
  fetchPcDetails(id);
}

const handleFileChange = async (info) => {
  const formData = new FormData();

  formData.append("image", info);

  try {
    loading.value = true;
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=3d8f48228f5867b6a9c542e95ae398b5",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Error uploading file");
    }

    const result = await response.json();

    images.push(result.data.display_url);

    console.log("images", images);
    loading.value = false;
  } catch (error) {
    console.error(error.message);
  }
};
</script>
<template>
  <a-form
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    style="max-width: 1460px"
    layout="horizontal"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
      <a-col class="gutter-box1" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <a-form-item
          label="Numéro Série"
          name="numeroSerie"
          :rules="[{ required: true, message: 'Veuillez remplir ce champ' }]"
        >
          <a-input v-model:value="formState.numeroSerie" />
        </a-form-item>

        <a-form-item
          name="modele"
          label="Modèle"
          :rules="[
            { required: true, message: 'Veuillez sélectionner une option' },
          ]"
        >
          <a-radio-group v-model:value="formState.modele">
            <a-radio-button value="Macbook AIR">Macbook AIR</a-radio-button>
            <a-radio-button value="Macbook PRO">Macbook PRO</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="Année de sortie"
          name="anneeSortie"
          :rules="[{ required: true, message: 'Veuillez remplir ce champ' }]"
        >
          <a-date-picker
            v-model:value="formState.anneeSortie"
            value-format="YYYY"
            picker="year"
          />
        </a-form-item>

        <a-form-item
          label="Processeur"
          name="processeur"
          :rules="[{ required: true, message: 'Veuillez remplir ce champ' }]"
        >
          <a-input v-model:value="formState.processeur" />
        </a-form-item>

        <a-form-item
          name="memoire"
          label="Mémoire"
          :rules="[
            { required: true, message: 'Veuillez sélectionner une option' },
          ]"
        >
          <a-radio-group v-model:value="formState.memoire">
            <a-radio-button value="8 Go">8 Go</a-radio-button>
            <a-radio-button value="16 Go">16 Go</a-radio-button>
            <a-radio-button value="32 Go">32 Go</a-radio-button>
            <a-radio-button value="64 Go">64 Go</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          name="etat"
          label="Etat"
          :rules="[
            { required: true, message: 'Veuillez sélectionner une option' },
          ]"
        >
          <a-radio-group v-model:value="formState.etat">
            <a-radio-button value="correcte">Correcte</a-radio-button>
            <a-radio-button value="tresBon">Tres bon</a-radio-button>
            <a-radio-button value="parfait">Parfait</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          name="capaciteStockage"
          label="Capacité de stockage"
          :rules="[
            { required: true, message: 'Veuillez sélectionner une option' },
          ]"
        >
          <a-radio-group v-model:value="formState.capaciteStockage">
            <a-radio-button value="128 Go">128 Go</a-radio-button>
            <a-radio-button value="256 Go">256 Go</a-radio-button>
            <a-radio-button value="512 Go">512 Go</a-radio-button>
            <a-radio-button value="1000 Go">1000 Go</a-radio-button>
            <a-radio-button value="2000 Go">2000 Go</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="Couleur">
          <a-input v-model:value="formState.couleur" />
        </a-form-item>

        <a-form-item label="Type du langue clavier">
          <a-input v-model:value="formState.typeLangueClavier" />
        </a-form-item>
      </a-col>

      <a-col class="gutter-box3" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <a-form-item
          name="tailleEcran"
          label="Taille écran (pouces)"
          :rules="[
            { required: true, message: 'Veuillez sélectionner une option' },
          ]"
        >
          <a-radio-group v-model:value="formState.tailleEcran">
            <a-radio-button value='13 "'>13 "</a-radio-button>
            <a-radio-button value='15 "'>15 "</a-radio-button>
            <a-radio-button value='16 "'>16 "</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="Cycle Batterie"
          name="cycleBatterie"
          :rules="[{ required: true, message: 'Veuillez remplir ce champ' }]"
        >
          <a-input-number v-model:value="formState.cycleBatterie" :min="0" />
        </a-form-item>

        <a-form-item
          name="touchBar"
          label="Touch Bar"
          :rules="[
            { required: true, message: 'Veuillez sélectionner une option' },
          ]"
        >
          <a-radio-group v-model:value="formState.touchBar">
            <a-radio-button value="oui">OUI</a-radio-button>
            <a-radio-button value="non">NON</a-radio-button>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="Prix"
          name="prix"
          :rules="[{ required: true, message: 'Veuillez remplir ce champ' }]"
        >
          <a-input-number v-model:value="formState.prix" :min="0">
            <template #addonAfter>TND</template>
          </a-input-number>
        </a-form-item>

        <a-form-item label="Description" name="description">
          <a-textarea :rows="4" v-model:value="formState.description" />
        </a-form-item>

        <a-form-item label="Vendu" name="vendu">
          <a-switch v-model:checked="formState.vendu" />
        </a-form-item>
        <div v-if="!id">
          <a-form-item label="Images">
            <a-upload
              :action="handleFileChange"
              list-type="picture-card"
              @change="handleChange"
            >
              <a-spin v-if="loading"></a-spin>
              <div v-else>
                <PlusOutlined />
                <div style="margin-top: 8px">Importer</div>
              </div>
            </a-upload>
          </a-form-item>
        </div>
      </a-col>
    </a-row>
    <a-form-item
      :wrapper-col="{
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
      }"
    >
      <a-button
        type="primary"
        html-type="submit"
        :loading="loading"
        style="width: 50%"
      >
        <a-spin v-if="Submittingloading"></a-spin>
        <div v-else>
          <div v-if="id">Modifier</div>
          <div v-else>Ajouter</div>
        </div>
      </a-button>
    </a-form-item>
  </a-form>
</template>
