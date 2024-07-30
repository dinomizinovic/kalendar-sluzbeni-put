<template>
  <v-dialog
    v-model="localStatusDialog"
    @click:outside="handleClickOutside"
    max-width="500"
  >
    <v-card>
      <v-container>
        <h1 class="mb-6">Status</h1>
        <v-form @submit.prevent="openPeriodRegDialog">
          <v-select
            v-model="localStatus"
            :items="statusMethods"
            label="Status"
            data-vv-name="status"
            required
          ></v-select>
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            @click.stop="closeStatusDialog"
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
      statusMethods: [
        "Na obradi",
        "Poslano na korekciju",
        "Otkazano",
        "Zakljuceno",
      ],
    };
  },
  computed: {
    ...mapState({
      statusDialog: (state) => state.statusDialog,
      status: (state) => state.status,
    }),
    localStatusDialog: {
      get() {
        return this.statusDialog;
      },
      set(value) {
        this.setStatusDialog(value);
      },
    },
    localStatus: {
      get() {
        return this.status;
      },
      set(value) {
        this.setStatus(value);
      },
    },
  },
  methods: {
    ...mapMutations([
      "setStatusDialog",
      "setStatus",
      "setPeriodRegDialogToTrue",
      "setStatusDialogToFalse",
    ]),
    openPeriodRegDialog() {
      this.setPeriodRegDialogToTrue();
    },
    closeStatusDialog() {
      this.setStatusDialogToFalse();
    },
    handleClickOutside() {
      this.setStatusDialogToFalse();
    },
  },
};
</script>
