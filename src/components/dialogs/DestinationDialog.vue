<template>
  <v-dialog
    v-model="destinationsDialog"
    @click:outside="handleClickOutside"
    max-width="500"
  >
    <v-card>
      <v-container>
        <h1 class="mb-6">Odrediste</h1>
        <v-form @submit.prevent="openDepositDialog">
          <v-text-field
            type="text"
            label="Svrha"
            v-model="localName"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Razlog putovanja"
            v-model="localDetails"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Polazna drzava"
            v-model="localStartState"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Polazni grad"
            v-model="localStartCity"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Odredisna drzava"
            v-model="localEndState"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Odredisni grad"
            v-model="localEndCity"
          ></v-text-field>
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            @click.stop="closeDestinationDialog"
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
  computed: {
    ...mapState([
      "destinationsDialog",
      "name",
      "details",
      "startState",
      "startCity",
      "endState",
      "endCity",
    ]),
    localName: {
      get() {
        return this.name;
      },
      set(value) {
        this.setName(value);
      },
    },
    localDetails: {
      get() {
        return this.details;
      },
      set(value) {
        this.setDetails(value);
      },
    },
    localStartState: {
      get() {
        return this.startState;
      },
      set(value) {
        this.setStartState(value);
      },
    },
    localStartCity: {
      get() {
        return this.startCity;
      },
      set(value) {
        this.setStartCity(value);
      },
    },
    localEndState: {
      get() {
        return this.endState;
      },
      set(value) {
        this.setEndState(value);
      },
    },
    localEndCity: {
      get() {
        return this.endCity;
      },
      set(value) {
        this.setEndCity(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setDestinationsDialog",
      "setName",
      "setDetails",
      "setStartState",
      "setStartCity",
      "setEndState",
      "setEndCity",
    ]),
    openDepositDialog() {
      this.$store.commit("setDepositDialogToTrue");
    },
    closeDestinationDialog() {
      this.setDestinationsDialog(false);
    },
    handleClickOutside() {
      this.setDestinationsDialog(false);
    },
  },
};
</script>
