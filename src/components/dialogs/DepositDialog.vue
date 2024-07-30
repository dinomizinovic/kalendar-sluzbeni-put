<template>
  <v-dialog
    v-model="localDepositDialog"
    @click:outside="handleClickOutside"
    max-width="500"
  >
    <v-card>
      <v-container>
        <h1 class="mb-6">Akontacija</h1>
        <v-form @submit.prevent="openVehicleDialog">
          <v-text-field
            v-model="localDeposit"
            type="number"
            label="Vrijednost akontacije"
          ></v-text-field>
          <v-select
            :items="paymentMethods"
            v-model="localSelectPayment"
            label="Isplata"
            data-vv-name="isplata"
            required
          ></v-select>
          <v-text-field
            type="date"
            label="Akontacija do datuma"
            v-model="localDepositEndDate"
          ></v-text-field>
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            @click.stop="closeDepositDialog"
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
      paymentMethods: ["Karticom", "Isplata novcem"],
    };
  },
  computed: {
    ...mapState({
      depositDialog: (state) => state.depositDialog,
      deposit: (state) => state.deposit,
      selectPayment: (state) => state.selectPayment,
      depositEndDate: (state) => state.depositEndDate,
    }),
    localDepositDialog: {
      get() {
        return this.depositDialog;
      },
      set(value) {
        this.setDepositDialog(value);
      },
    },
    localDeposit: {
      get() {
        return this.deposit;
      },
      set(value) {
        this.setDeposit(value);
      },
    },
    localSelectPayment: {
      get() {
        return this.selectPayment;
      },
      set(value) {
        this.setSelectPayment(value);
      },
    },
    localDepositEndDate: {
      get() {
        return this.depositEndDate;
      },
      set(value) {
        this.setDepositEndDate(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setDepositDialog",
      "setDeposit",
      "setSelectPayment",
      "setDepositEndDate",
      "setVehicleDialogToTrue",
      "setDepositDialogToFalse",
    ]),
    openVehicleDialog() {
      this.setVehicleDialogToTrue();
    },
    closeDepositDialog() {
      this.setDepositDialogToFalse();
    },
    handleClickOutside() {
      this.setDepositDialogToFalse();
    },
  },
};
</script>
