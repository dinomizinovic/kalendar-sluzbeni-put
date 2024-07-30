<template>
  <div>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" @click="setToday"> Danas </v-btn>
            <v-btn fab text small @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-menu bottom right>
              <template v-slot:activator="{ on }">
                <v-btn outlined v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Dan</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Sedmica</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mjesec</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 Dana</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn
              color="primary"
              class="mr-4"
              dark
              @click.stop="registerEvent"
            >
              REGISTRUJ ODSUSTVO
            </v-btn>
            <router-link to="/events"
              ><v-btn color="white" light> LISTA NALOGA </v-btn></router-link
            >
          </v-toolbar>
        </v-sheet>
        <CalendarGuide />
        <StatusDialog />
        <PeriodRegistrationDialog />
        <DestinationDialog />
        <DepositDialog />
        <VehicleDialog />
        <SleepingDialog />
        <FoodIncludedDialog />
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :event-margin-bottom="3"
            :now="today"
            :type="type"
            :weekdays="[1, 2, 3, 4, 5, 6, 0]"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="setDialogDate"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" :width="350" flat>
              <v-toolbar :color="getEventColor(selectedEvent)" dark>
                <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
                <div class="flex-grow-1"></div>
              </v-toolbar>
              <v-card-text>
                <form v-if="currentlyEditing !== selectedEvent.id">
                  {{ selectedEvent.details }}
                </form>
                <form v-else>
                  <textarea-autosize
                    v-model="selectedEvent.details"
                    type="text"
                    style="width: 100%"
                    :min-height="100"
                    placeholder="add note"
                  >
                  </textarea-autosize>
                </form>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DepositDialog from "./../dialogs/DepositDialog.vue";
import DestinationDialog from "./../dialogs/DestinationDialog.vue";
import FoodIncludedDialog from "./../dialogs/FoodIncludedDialog.vue";
import PeriodRegistrationDialog from "./../dialogs/PeriodRegistrationDialog.vue";
import SleepingDialog from "./../dialogs/SleepingDialog.vue";
import StatusDialog from "./../dialogs/StatusDialog.vue";
import VehicleDialog from "./../dialogs/VehicleDialog.vue";
import CalendarGuide from "./../calendar/CalendarGuide.vue";

export default {
  components: {
    DepositDialog,
    DestinationDialog,
    FoodIncludedDialog,
    PeriodRegistrationDialog,
    SleepingDialog,
    StatusDialog,
    VehicleDialog,
    CalendarGuide,
  },
  computed: {
    ...mapState({
      events: (state) => state.events,
    }),
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;
      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);
      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long",
      });
    },
  },
  data: () => ({
    today: new Date().toISOString().slice(0, 16),
    focus: new Date().toISOString().slice(0, 16),
    typeToLabel: {
      month: "Mjesec",
      week: "Sedmica",
      day: "Dan",
      "4day": "4 Dana",
    },
    type: "month",
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  methods: {
    registerEvent() {
      this.$store.commit("setPeriodRegDialogToTrue");
    },
    setDialogDate({ date }) {
      this.focus = date;
    },
    setToday() {
      this.focus = this.today;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    getEventColor(event) {
      if (event.status === "Zakljuceno") {
        return "#002244";
      } else if (event.status === "Otkazano") {
        return "#0047AB";
      } else if (event.status === "Poslano na korekciju") {
        return "#00BFFF";
      } else {
        return "#5D8CAE";
      }
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
  },
};
</script>
