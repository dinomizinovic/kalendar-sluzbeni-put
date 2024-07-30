<template>
  <div>
    <CalendarGuide class="position-sticky" />
    <router-link to="/"
      ><v-btn class="position-fixed ml-4 mt-4" color="#F0F8FF" light>
        <v-icon small>mdi-calendar-arrow-left</v-icon>
      </v-btn></router-link
    >
    <v-card
      class="mx-auto mt-16"
      max-width="350"
      :color="getEventColor(event)"
      dark
      tile
      v-for="event in events"
      :key="event.id"
    >
      <v-list-item class="mb-10">
        <v-list-item-content class="text-center">
          <v-btn
            @click.prevent="showStatusDialog(event)"
            class="mt-2 mb-2"
            :depressed="zakljucenNalog(event)"
            :disabled="zakljucenNalog(event)"
            color="primary"
            secondary
            small
          >
            UREDI
            <v-icon right dark>mdi-pencil</v-icon>
          </v-btn>
          <v-btn @click.prevent="handleDelete(event.id)" small class="mb-2">
            IZBRISI
            <v-icon right dark>mdi-delete</v-icon>
          </v-btn>
          <v-list-item-title class="mb-1 text-center">
            <h3>Broj naloga {{ event.id }}</h3>
          </v-list-item-title>
          <hr />
          <v-list-item-subtitle class="mt-1 mb-1">
            Period od {{ formatTheDateAndTime(event.start) }} do
            {{ formatTheDateAndTime(event.end) }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1">
            Ime putnika: {{ event.travelerName }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1">
            Ime registratora: {{ event.registererFullName }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1">
            Datum kreiranja:
            {{ formatTheDateAndTime(event.eventDateOfCreation) }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1">
            Status naloga: {{ event.status }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1">
            <v-btn
              @click.prevent="handleDownload(event)"
              color="#19DD89"
              small
              :disabled="zakljucenNalog(event)"
              :depressed="zakljucenNalog(event)"
            >
              EXCEL DWNLD - {{ event.id }}
            </v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import CalendarGuide from "./CalendarGuide.vue";
import { mapState } from "vuex";

export default {
  name: "EventCard",
  components: {
    CalendarGuide,
  },
  computed: {
    ...mapState({
      events: (state) => state.events,
    }),
    getEventColor() {
      return (event) => {
        if (event.status === "Zakljuceno") {
          return "#002244";
        } else if (event.status === "Otkazano") {
          return "#0047AB";
        } else if (event.status === "Poslano na korekciju") {
          return "#00BFFF";
        } else {
          return "#5D8CAE";
        }
      };
    },
  },
  methods: {
    showStatusDialog(event) {
      this.$router.push("/");
      this.$store.commit("setCurrentEvent", event);
      this.$store.commit("setStatusDialogToTrue");
    },
    formatTheDateAndTime(originalDateTime) {
      let date = new Date(originalDateTime);
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}.${month}.${year} u ${hours}:${minutes}`;
    },
    zakljucenNalog(event) {
      return event.status === "Zakljuceno";
    },
    handleDelete(eventId) {
      this.$store.commit("removeEventById", eventId);
    },
    handleDownload(obj) {
      this.convertObjectIntoExcel(obj);
    },
    convertObjectIntoExcel(obj) {
      const keys = Object.keys(obj);
      const values = Object.values(obj);
      const result = [keys, values];
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(result);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${obj.id}.xlsx`);
    },
  },
};
</script>

<style scoped>
.position-sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}
.position-fixed {
  position: fixed;
  z-index: 10;
}
</style>
