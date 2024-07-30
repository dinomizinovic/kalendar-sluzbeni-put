<template>
  <v-dialog
    v-model="localFoodIncludedDialog"
    @click:outside="handleClickOutside"
    max-width="500"
  >
    <v-card>
      <v-container>
        <h1 class="mb-6">HRANA (3 OBROKA)?</h1>
        <v-form @submit.prevent="addEvent">
          <v-checkbox
            label="Da li su bila osigurana 3 obroka?"
            v-model="localFoodIncluded"
          ></v-checkbox>
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            @click.stop="closeDialog"
          >
            {{ id ? "Uredi Nalog" : "Registruj Odsustvo" }}
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      localFoodIncludedDialog: false,
      localFoodIncluded: false,
    };
  },
  computed: {
    ...mapState([
      "foodIncludedDialog",
      "id",
      "foodIncluded",
      "name",
      "startDate",
      "startTime",
      "startState",
      "startCity",
      "endDate",
      "endTime",
      "endState",
      "endCity",
      "details",
      "deposit",
      "selectPayment",
      "travelerName",
      "registererFullName",
      "depositEndDate",
      "vehicle",
      "vehicleInBAM",
      "sleeping",
      "sleepingCount",
      "sleepingPrice",
      "editedAtFoodIncluded",
    ]),
    ...mapGetters(["dateNow"]),
  },
  watch: {
    foodIncludedDialog: {
      immediate: true,
      handler(newVal) {
        this.localFoodIncludedDialog = newVal;
      },
    },
    localFoodIncludedDialog(newVal) {
      if (!newVal) this.$store.commit("setFoodIncludedDialogToFalse");
    },
    foodIncluded: {
      immediate: true,
      handler(newVal) {
        this.localFoodIncluded = newVal;
      },
    },
    localFoodIncluded(newVal) {
      this.$store.commit("setFoodIncluded", newVal);
    },
  },
  methods: {
    addEvent() {
      if (
        this.name &&
        this.startDate &&
        this.startTime &&
        this.startState &&
        this.startCity &&
        this.endDate &&
        this.endTime &&
        this.endState &&
        this.endCity &&
        this.details &&
        this.deposit &&
        this.selectPayment &&
        this.travelerName &&
        this.registererFullName &&
        this.depositEndDate &&
        this.vehicle &&
        this.vehicleInBAM
      ) {
        const event = {
          id: this.id || Math.random().toString(36).substr(2, 16),
          status: "Na obradi",
          travelerName: this.travelerName,
          deposit: this.deposit,
          depositEndDate: this.depositEndDate,
          vehicleInBAM: this.vehicleInBAM,
          sleeping: this.sleeping,
          sleepingCount: this.sleepingCount,
          foodIncluded: this.foodIncluded,
          sleepingPrice: this.sleepingPrice,
          vehicle: this.vehicle,
          selectPayment: this.selectPayment,
          registererFullName: this.registererFullName,
          name: this.name,
          details: this.details,
          startDate: this.startDate,
          startTime: this.startTime,
          startState: this.startState,
          startCity: this.startCity,
          endDate: this.endDate,
          endTime: this.endTime,
          endState: this.endState,
          endCity: this.endCity,
          eventDateOfCreation: this.dateNow,
        };

        if (!this.id) {
          this.$store.commit("addEventToStore", event);
        } else {
          const eventToUpdate = this.$store.state.events.find(
            (e) => e.id === this.id
          );
          this.$store.commit("updateEventInStore", eventToUpdate);
        }
        this.resetForm();
      } else {
        alert("Sva polja moraju biti popunjena!");
      }
    },
    resetForm() {
      this.$store.commit("resetEventState");
    },
    closeDialog() {
      this.$store.commit("setFoodIncludedDialogToFalse");
    },
    handleClickOutside() {
      this.closeDialog();
    },
  },
};
</script>
