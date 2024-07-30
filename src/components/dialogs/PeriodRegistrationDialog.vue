<template>
  <v-dialog
    v-model="periodRegDialog"
    @click:outside="handleClickOutside"
    max-width="500"
  >
    <v-card>
      <v-container>
        <h1 class="mb-6">Period i registracija</h1>
        <v-form @submit.prevent="openDestinationDialog">
          <v-text-field
            type="date"
            label="Polazak datum"
            v-model="localStartDate"
          ></v-text-field>
          <v-text-field
            type="time"
            label="Polazak sati"
            v-model="localStartTime"
          ></v-text-field>
          <v-text-field
            type="date"
            label="Krajnji datum"
            v-model="localEndDate"
          ></v-text-field>
          <v-text-field
            type="time"
            label="Krajnji sati"
            v-model="localEndTime"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Ime i prezime registrovanog"
            v-model="localTravelerName"
          ></v-text-field>
          <v-text-field
            type="text"
            label="Ime i prezime onoga koji registruje"
            v-model="localRegistererFullName"
          ></v-text-field>
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            @click.stop="closePeriodRegistrationDialog"
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
      "periodRegDialog",
      "startDate",
      "startTime",
      "endDate",
      "endTime",
      "travelerName",
      "registererFullName",
    ]),
    localStartDate: {
      get() {
        return this.startDate;
      },
      set(value) {
        this.setStartDate(value);
      },
    },
    localStartTime: {
      get() {
        return this.startTime;
      },
      set(value) {
        this.setStartTime(value);
      },
    },
    localEndDate: {
      get() {
        return this.endDate;
      },
      set(value) {
        this.setEndDate(value);
      },
    },
    localEndTime: {
      get() {
        return this.endTime;
      },
      set(value) {
        this.setEndTime(value);
      },
    },
    localTravelerName: {
      get() {
        return this.travelerName;
      },
      set(value) {
        this.setTravelerName(value);
      },
    },
    localRegistererFullName: {
      get() {
        return this.registererFullName;
      },
      set(value) {
        this.setRegistererFullName(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setPeriodRegDialog",
      "setStartDate",
      "setStartTime",
      "setEndDate",
      "setEndTime",
      "setTravelerName",
      "setRegistererFullName",
    ]),
    openDestinationDialog() {
      this.$store.commit("setDestinationsDialogToTrue");
    },
    closePeriodRegistrationDialog() {
      this.setPeriodRegDialog(false);
    },
    handleClickOutside() {
      this.setPeriodRegDialog(false);
    },
  },
};
</script>
