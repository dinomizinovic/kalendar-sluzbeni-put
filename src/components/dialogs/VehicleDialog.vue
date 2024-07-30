<template>
  <v-dialog
    v-model="localVehicleDialog"
    @click:outside="handleClickOutside"
    max-width="500"
  >
    <v-card>
      <v-container>
        <h1 class="mb-6">Prijevoz</h1>
        <v-form @submit.prevent="openSleepingDialog">
          <v-text-field
            type="text"
            label="Prijevozno sredstvo"
            v-model="localVehicle"
          ></v-text-field>
          <v-text-field
            type="number"
            label="Prijevoz iznos u KM"
            v-model="localVehicleInBAM"
          ></v-text-field>
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            @click.stop="closeVehicleDialog"
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
      sleepingDialog: false,
    };
  },
  computed: {
    ...mapState({
      vehicleDialog: (state) => state.vehicleDialog,
      vehicleInBAM: (state) => state.vehicleInBAM,
      vehicle: (state) => state.vehicle,
    }),
    localVehicleDialog: {
      get() {
        return this.vehicleDialog;
      },
      set(value) {
        this.setVehicleDialog(value);
      },
    },
    localVehicleInBAM: {
      get() {
        return this.vehicleInBAM;
      },
      set(value) {
        this.setVehicleInBAM(value);
      },
    },
    localVehicle: {
      get() {
        return this.vehicle;
      },
      set(value) {
        this.setVehicle(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setVehicleDialog",
      "setVehicleInBAM",
      "setVehicle",
      "setSleepingDialogToTrue",
      "setVehicleDialogToFalse",
    ]),
    openSleepingDialog() {
      this.setSleepingDialogToTrue();
    },
    closeVehicleDialog() {
      this.setVehicleDialogToFalse();
    },
    handleClickOutside() {
      this.setVehicleDialogToFalse();
    },
  },
};
</script>
