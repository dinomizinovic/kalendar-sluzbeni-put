<template>
  <v-dialog
    v-model="localSleepingDialog"
    @click:outside="handleClickOutside"
    max-width="500"
  >
    <v-card>
      <v-container>
        <h1 class="mb-6">Nocenje</h1>
        <v-form @submit.prevent="openFoodIncludedDialog">
          <v-text-field
            type="text"
            label="Vrsta smjestaja"
            v-model="localSleeping"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Broj nocenja"
            v-model="localSleepingCount"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Iznos nocenja u KM"
            v-model="localSleepingPrice"
          ></v-text-field>
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            @click.stop="closeSleepingDialog"
          >
            DALJE
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      localSleepingDialog: false,
      localSleeping: "",
      localSleepingCount: 0,
      localSleepingPrice: 0,
    };
  },
  computed: {
    ...mapState({
      sleepingDialog: (state) => state.sleepingDialog,
      sleeping: (state) => state.sleeping,
      sleepingCount: (state) => state.sleepingCount,
      sleepingPrice: (state) => state.sleepingPrice,
    }),
  },
  watch: {
    sleepingDialog: {
      immediate: true,
      handler(newVal) {
        this.localSleepingDialog = newVal;
      },
    },
    sleeping: {
      immediate: true,
      handler(newVal) {
        this.localSleeping = newVal;
      },
    },
    localSleeping(newVal) {
      this.setSleeping(newVal);
    },
    sleepingCount: {
      immediate: true,
      handler(newVal) {
        this.localSleepingCount = newVal;
      },
    },
    localSleepingCount(newVal) {
      this.setSleepingCount(newVal);
    },
    sleepingPrice: {
      immediate: true,
      handler(newVal) {
        this.localSleepingPrice = newVal;
      },
    },
    localSleepingPrice(newVal) {
      this.setSleepingPrice(newVal);
    },
  },
  methods: {
    ...mapMutations([
      "setSleepingDialog",
      "setSleeping",
      "setSleepingCount",
      "setSleepingPrice",
      "setFoodIncludedDialogToTrue",
      "setSleepingDialogToFalse",
    ]),
    openFoodIncludedDialog() {
      this.setFoodIncludedDialogToTrue();
    },
    closeSleepingDialog() {
      this.setSleepingDialogToFalse();
    },
    handleClickOutside() {
      this.setSleepingDialogToFalse();
    },
  },
};
</script>
