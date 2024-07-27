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
              @click.stop="periodRegDialog = true"
            >
              REGISTRUJ ODSUSTVO
            </v-btn>
            <v-btn
              v-if="!eventList"
              color="white"
              light
              @click.prevent="toggleList"
            >
              LISTA NALOGA
            </v-btn>
            <v-btn v-else color="dark" dark @click.prevent="toggleList">
              UKLONI LISTU
            </v-btn>
          </v-toolbar>
        </v-sheet>

        <v-sheet height="64">
          <v-toolbar flat color="#F0F8FF">
            <v-btn x-small color="#5D8CAE" class="rounded-lg mx-auto" dark>
              OBRADA
            </v-btn>
            <v-btn x-small color="#00BFFF" class="rounded-lg mx-auto" dark>
              KOREKCIJA
            </v-btn>
            <v-btn x-small color="#0047AB" class="rounded-lg mx-auto" dark>
              OTKAZANO
            </v-btn>
            <v-btn x-small color="#002244" class="rounded-lg mx-auto" dark>
              ZAKLJUCENO
            </v-btn>
          </v-toolbar>
        </v-sheet>

        <v-dialog v-model="statusDialog" max-width="500">
          <v-card>
            <v-container>
              <h1 class="mb-6">Akontacija</h1>
              <v-form @submit.prevent="periodRegDialog = true">
                <v-select
                  v-model="status"
                  :items="statusMethods"
                  label="Status"
                  data-vv-name="status"
                  required
                ></v-select>
                <v-btn
                  type="submit"
                  color="primary"
                  class="mr-4"
                  @click.stop="statusDialog = false"
                >
                  DALJE
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="periodRegDialog" max-width="500">
          <v-card>
            <v-container>
              <h1 class="mb-6">Period i registracija</h1>
              <v-form @submit.prevent="destinationsDialog = true">
                <v-text-field
                  v-model="startDate"
                  type="date"
                  label="Polazak datum"
                ></v-text-field>
                <v-text-field
                  v-model="startTime"
                  type="time"
                  label="Polazak sati"
                ></v-text-field>
                <v-text-field
                  v-model="endDate"
                  type="date"
                  label="Krajnji datum"
                ></v-text-field>
                <v-text-field
                  v-model="endTime"
                  type="time"
                  label="Krajnji sati"
                ></v-text-field>
                <v-text-field
                  v-model="travelerName"
                  type="text"
                  label="Ime i prezime registrovanog"
                ></v-text-field>
                <v-text-field
                  v-model="registererFullName"
                  type="text"
                  label="Ime i prezime onoga koji registruje"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  class="mr-4"
                  @click.stop="periodRegDialog = false"
                >
                  DALJE
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="destinationsDialog" max-width="500">
          <v-card>
            <v-container>
              <h1 class="mb-6">Odrediste</h1>
              <v-form @submit.prevent="depositDialog = true">
                <v-text-field
                  v-model="name"
                  type="text"
                  label="Svrha"
                ></v-text-field>
                <v-text-field
                  v-model="details"
                  type="text"
                  label="Razlog putovanja"
                ></v-text-field>
                <v-text-field
                  v-model="startState"
                  type="text"
                  label="Polazna drzava"
                ></v-text-field>
                <v-text-field
                  v-model="startCity"
                  type="text"
                  label="Polazni grad"
                ></v-text-field>
                <v-text-field
                  v-model="endState"
                  type="text"
                  label="Odredisna drzava"
                ></v-text-field>
                <v-text-field
                  v-model="endCity"
                  type="text"
                  label="Odredisni grad"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  class="mr-4"
                  @click.stop="destinationsDialog = false"
                >
                  DALJE
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="depositDialog" max-width="500">
          <v-card>
            <v-container>
              <h1 class="mb-6">Akontacija</h1>
              <v-form @submit.prevent="vehicleDialog = true">
                <v-text-field
                  v-model="deposit"
                  type="number"
                  label="Vrijednost akontacije"
                ></v-text-field>
                <v-select
                  v-model="selectPayment"
                  :items="paymentMethods"
                  label="Isplata"
                  data-vv-name="isplata"
                  required
                ></v-select>
                <v-text-field
                  v-model="depositEndDate"
                  type="date"
                  label="Akontacija do datuma"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  class="mr-4"
                  @click.stop="depositDialog = false"
                >
                  DALJE
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="vehicleDialog" max-width="500">
          <v-card>
            <v-container>
              <h1 class="mb-6">Prijevoz</h1>
              <v-form @submit.prevent="sleepingDialog = true">
                <v-text-field
                  v-model="vehicle"
                  type="text"
                  label="Prijevozno sredstvo"
                ></v-text-field>
                <v-text-field
                  v-model="vehicleInBAM"
                  type="number"
                  label="Prijevoz iznos u KM"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  class="mr-4"
                  @click.stop="vehicleDialog = false"
                >
                  DALJE
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="sleepingDialog" max-width="500">
          <v-card>
            <v-container>
              <h1 class="mb-6">Nocenje</h1>
              <v-form @submit.prevent="dialog = true">
                <v-text-field
                  v-model="sleeping"
                  type="text"
                  label="Vrsta smjestaja"
                ></v-text-field>
                <v-text-field
                  v-model="sleepingCount"
                  type="number"
                  label="Broj nocenja"
                ></v-text-field>
                <v-text-field
                  v-model="sleepingPrice"
                  type="number"
                  label="Iznos nocenja u KM"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  class="mr-4"
                  @click.stop="sleepingDialog = false"
                >
                  DALJE
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-container>
              <h1 class="mb-6">HRANA (3 OBROKA)?</h1>
              <v-form @submit.prevent="addEvent">
                <v-checkbox
                  v-model="foodIncluded"
                  label="Da li su bila osigurana 3 obroka?"
                ></v-checkbox>
                <v-btn
                  type="submit"
                  color="primary"
                  class="mr-4"
                  @click.stop="dialog = false"
                >
                  REGISTRUJ ODSUSTVO
                </v-btn>
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

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
    <div v-if="eventList">
      <EventCard
        :events="events"
        @eventUpdate="handleUpdate"
        @eventDelete="handleDeleteEvent"
      />
    </div>
  </div>
</template>

<script>
import EventCard from "./CalendarEventList.vue";

export default {
  components: {
    EventCard,
  },
  data: () => ({
    eventList: false,
    id: null,
    status: "Na obradi",
    today: new Date().toISOString().slice(0, 16),
    focus: new Date().toISOString().slice(0, 16),
    type: "month",
    typeToLabel: {
      month: "Mjesec",
      week: "Sedmica",
      day: "Dan",
      "4day": "4 Dana",
    },
    paymentMethods: ["Karticom", "Isplata novcem"],
    statusMethods: [
      "Na obradi",
      "Poslano na korekciju",
      "Otkazano",
      "Zakljuceno",
    ],
    deposit: null,
    windowWidth: null,
    depositEndDate: null,
    vehicleInBAM: null,
    sleeping: null,
    sleepingCount: null,
    foodIncluded: false,
    sleepingPrice: null,
    vehicle: null,
    travelerName: null,
    selectPayment: "Karticom",
    registererFullName: null,
    name: null,
    details: null,
    startDate: null,
    startTime: null,
    startState: null,
    startCity: null,
    endDate: null,
    endTime: null,
    endState: null,
    endCity: null,
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    statusDialog: false,
    periodRegDialog: false,
    destinationsDialog: false,
    depositDialog: false,
    vehicleDialog: false,
    sleepingDialog: false,
    dialog: false,
    editedAtTravelerName: null,
    editedAtDeposit: null,
    editedAtDepositEndDate: null,
    editedAtVehicleInBAM: null,
    editedAtSleeping: null,
    editedAtSleepingCount: null,
    editedAtFoodIncluded: null,
    editedAtSleepingPrice: null,
    editedAtVehicle: null,
    editedAtRegistererFullName: null,
    editedAtSelectPayment: null,
    editedAtName: null,
    editedAtStatus: null,
    editedAtDetails: null,
    editedAtStartDate: null,
    editedAtStartTime: null,
    editedAtEndDate: null,
    editedAtEndTime: null,
    editedAtStartState: null,
    editedAtStartCity: null,
    editedAtEndState: null,
    editedAtEndCity: null,
  }),
  watch: {
    events(newEvents) {
      if (newEvents.length === 0) {
        this.eventList = false;
      }
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    this.hardCodedEvent();
    this.addEvent();
  },
  computed: {
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
  methods: {
    getDate(fullTime) {
      return fullTime.slice(0, 10);
    },
    getTime(fullTime) {
      return fullTime.substring(fullTime.length - 5);
    },
    handleUpdate(obj) {
      this.id = obj.id;
      this.deposit = obj.deposit;
      this.depositEndDate = obj.depositEndDate;
      this.vehicle = obj.vehicle;
      this.vehicleInBAM = obj.vehicleInBAM;
      this.sleeping = obj.sleeping;
      this.sleepingCount = obj.sleepingCount;
      this.sleepingPrice = obj.sleepingPrice;
      this.foodIncluded = obj.foodIncluded;
      this.travelerName = obj.travelerName;
      this.registererFullName = obj.registererFullName;
      this.selectPayment = obj.selectPayment;
      this.name = obj.name;
      this.details = obj.details;
      this.startDate = this.getDate(obj.start);
      this.startTime = this.getTime(obj.start);
      this.startState = obj.startState;
      this.startCity = obj.startCity;
      this.endDate = this.getDate(obj.end);
      this.endTime = this.getTime(obj.end);
      this.endState = obj.endState;
      this.endCity = obj.endCity;
      this.status = obj.status;

      this.statusDialog = true;
    },
    toggleList() {
      this.eventList = !this.eventList;
    },
    setDialogDate({ date }) {
      this.focus = date;
    },
    hardCodedEvent() {
      (this.travelerName = "John Doe"),
        (this.deposit = 1000),
        (this.depositEndDate = "2024-08-01"),
        (this.vehicleInBAM = 400),
        (this.sleeping = "Hotel"),
        (this.sleepingCount = 2),
        (this.foodIncluded = true),
        (this.sleepingPrice = 200),
        (this.vehicle = "Automobil"),
        (this.registererFullName = "Jane Smith"),
        (this.selectPayment = "Karticom"),
        (this.name = "Sluzbeni put"),
        (this.details = "Sluzbeni put u Ameriku"),
        (this.startDate = "2024-07-15"),
        (this.startTime = "10:00"),
        (this.endDate = "2024-07-18"),
        (this.endTime = "18:00"),
        (this.startState = "BIH"),
        (this.startCity = "Sarajevo"),
        (this.endState = "CA"),
        (this.endCity = "Los Angeles");
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
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
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    createAnnEvent() {
      return {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 9),
        travelerName: this.travelerName,
        deposit: this.deposit,
        depositEndDate: this.depositEndDate,
        vehicleInBAM: this.vehicleInBAM,
        sleeping: this.sleeping,
        sleepingCount: this.sleepingCount,
        foodIncluded: this.foodIncluded,
        sleepingPrice: this.sleepingPrice,
        vehicle: this.vehicle,
        registererFullName: this.registererFullName,
        selectPayment: this.selectPayment,
        eventDateOfCreation: this.createCentralEuropeTimeNow(),
        name: this.name,
        status: "Na obradi",
        color: "#5D8CAE",
        details: this.details,
        start: `${this.startDate}T${this.startTime}`,
        end: `${this.endDate}T${this.endTime}`,
        startState: this.startState,
        startCity: this.startCity,
        endState: this.endState,
        endCity: this.endCity,
        editedAtTravelerName: this.editedAtTravelerName,
        editedAtDeposit: this.editedAtDeposit,
        editedAtDepositEndDate: this.editedAtDepositEndDate,
        editedAtVehicleInBAM: this.editedAtVehicleInBAM,
        editedAtSleeping: this.editedAtSleeping,
        editedAtSleepingCount: this.editedAtSleepingCount,
        editedAtFoodIncluded: this.editedAtFoodIncluded,
        editedAtSleepingPrice: this.editedAtSleepingPrice,
        editedAtVehicle: this.editedAtVehicle,
        editedAtRegistererFullName: this.editedAtRegistererFullName,
        editedAtSelectPayment: this.editedAtSelectPayment,
        editedAtName: this.editedAtName,
        editedAtStatus: this.editedAtStatus,
        editedAtDetails: this.editedAtDetails,
        editedAtStartDate: this.editedAtStartDate,
        editedAtStartTime: this.editedAtStartTime,
        editedAtEndDate: this.editedAtEndDate,
        editedAtEndTime: this.editedAtEndTime,
        editedAtStartState: this.editedAtStartState,
        editedAtStartCity: this.editedAtStartCity,
        editedAtEndState: this.editedAtEndState,
        editedAtEndCity: this.editedAtEndCity,
      };
    },
    restartEventValues() {
      (this.name = ""),
        (this.id = ""),
        (this.details = ""),
        (this.startDate = ""),
        (this.endDate = ""),
        (this.startTime = ""),
        (this.endTime = ""),
        (this.startState = ""),
        (this.startCity = ""),
        (this.endState = ""),
        (this.endCity = ""),
        (this.deposit = ""),
        (this.depositEndDate = ""),
        (this.vehicleInBAM = ""),
        (this.sleeping = ""),
        (this.sleepingCount = ""),
        (this.foodIncluded = false),
        (this.sleepingPrice = ""),
        (this.vehicle = ""),
        (this.selectPayment = "Karticom"),
        (this.registererFullName = ""),
        (this.travelerName = ""),
        (this.editedAtTravelerName = ""),
        (this.editedAtDeposit = ""),
        (this.editedAtDepositEndDate = ""),
        (this.editedAtVehicleInBAM = ""),
        (this.editedAtSleeping = ""),
        (this.editedAtSleepingCount = ""),
        (this.editedAtFoodIncluded = ""),
        (this.editedAtSleepingPrice = ""),
        (this.editedAtVehicle = ""),
        (this.editedAtRegistererFullName = ""),
        (this.editedAtSelectPayment = ""),
        (this.editedAtName = ""),
        (this.editedAtStatus = ""),
        (this.editedAtDetails = ""),
        (this.editedAtStartDate = ""),
        (this.editedAtStartTime = ""),
        (this.editedAtEndDate = ""),
        (this.editedAtEndTime = ""),
        (this.editedAtStartState = ""),
        (this.editedAtStartCity = ""),
        (this.editedAtEndState = ""),
        (this.editedAtEndCity = "");
    },
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
        if (!this.id) {
          const createdObject = this.createAnnEvent();
          this.events.unshift(createdObject);
          this.restartEventValues();
        } else {
          this.updateEvent();
        }
      } else {
        alert("Sva polja moraju biti popunjena!");
      }
    },
    updateEvent() {
      const updatedEvent = this.events.find((event) => event.id === this.id);
      if (updatedEvent) {
        const dateCreated = new Date().toISOString().slice(0, 16);

        if (updatedEvent.status !== this.status) {
          this.editedAtStatus = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.travelerName !== this.travelerName) {
          this.editedAtTravelerName = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.deposit !== this.deposit) {
          this.editedAtDeposit = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.depositEndDate !== this.depositEndDate) {
          this.editedAtDepositEndDate = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.vehicleInBAM !== this.vehicleInBAM) {
          this.editedAtVehicleInBAM = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.sleeping !== this.sleeping) {
          this.editedAtSleeping = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.sleepingCount !== this.sleepingCount) {
          this.editedAtSleepingCount = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.foodIncluded !== this.foodIncluded) {
          this.editedAtFoodIncluded = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.sleepingPrice !== this.sleepingPrice) {
          this.editedAtSleepingPrice = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.vehicle !== this.vehicle) {
          this.editedAtVehicle = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.registererFullName !== this.registererFullName) {
          this.editedAtRegistererFullName =
            this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.selectPayment !== this.selectPayment) {
          this.editedAtSelectPayment = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.name !== this.name) {
          this.editedAtName = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.details !== this.details) {
          this.editedAtDetails = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.startState !== this.startState) {
          this.editedAtStartState = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.start.slice(0, 10) !== this.startDate) {
          this.editedAtStartDate = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.start.slice(-5) !== this.startTime) {
          this.editedAtStartTime = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.startCity !== this.startCity) {
          this.editedAtStartCity = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.endState !== this.endState) {
          this.editedAtEndState = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.end.slice(0, 10) !== this.endDate) {
          this.editedAtEndDate = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.end.slice(-5) !== this.endTime) {
          this.editedAtEndTime = this.formatTheDateAndTime(dateCreated);
        }
        if (updatedEvent.endCity !== this.endCity) {
          this.editedAtEndCity = this.formatTheDateAndTime(dateCreated);
        }
        Object.assign(updatedEvent, this.getCurrentEventData());
      }

      this.restartEventValues();
    },
    formatTheDateAndTime(originalDateTime) {
      let date = new Date(originalDateTime);
      date.setHours(date.getHours() + 2);
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");

      return `${day}.${month}.${year} - ${hours}:${minutes}`;
    },
    getCurrentEventData() {
      return {
        id: this.id,
        deposit: this.deposit,
        depositEndDate: this.depositEndDate,
        vehicleInBAM: this.vehicleInBAM,
        sleeping: this.sleeping,
        sleepingCount: this.sleepingCount,
        foodIncluded: this.foodIncluded,
        sleepingPrice: this.sleepingPrice,
        vehicle: this.vehicle,
        travelerName: this.travelerName,
        registererFullName: this.registererFullName,
        selectPayment: this.selectPayment,
        name: this.name,
        details: this.details,
        start: `${this.startDate}T${this.startTime}`,
        end: `${this.endDate}T${this.endTime}`,
        startState: this.startState,
        startCity: this.startCity,
        endState: this.endState,
        endCity: this.endCity,
        status: this.status,
        editedAtTravelerName: this.editedAtTravelerName,
        editedAtDeposit: this.editedAtDeposit,
        editedAtDepositEndDate: this.editedAtDepositEndDate,
        editedAtVehicleInBAM: this.editedAtVehicleInBAM,
        editedAtSleeping: this.editedAtSleeping,
        editedAtSleepingCount: this.editedAtSleepingCount,
        editedAtFoodIncluded: this.editedAtFoodIncluded,
        editedAtSleepingPrice: this.editedAtSleepingPrice,
        editedAtVehicle: this.editedAtVehicle,
        editedAtRegistererFullName: this.editedAtRegistererFullName,
        editedAtSelectPayment: this.editedAtSelectPayment,
        editedAtName: this.editedAtName,
        editedAtStatus: this.editedAtStatus,
        editedAtDetails: this.editedAtDetails,
        editedAtStartDate: this.editedAtStartDate,
        editedAtStartTime: this.editedAtStartTime,
        editedAtEndDate: this.editedAtEndDate,
        editedAtEndTime: this.editedAtEndTime,
        editedAtStartState: this.editedAtStartState,
        editedAtStartCity: this.editedAtStartCity,
        editedAtEndState: this.editedAtEndState,
        editedAtEndCity: this.editedAtEndCity,
      };
    },
    createCentralEuropeTimeNow() {
      let eventDateOfCreation = new Date().toISOString().slice(0, 16);
      let date = new Date(eventDateOfCreation);
      date.setHours(date.getHours() + 4);
      return date.toISOString().slice(0, 16);
    },
    handleDeleteEvent(ev) {
      const newEvents = this.events.filter(
        (eventElement) => eventElement.id !== ev.id
      );
      this.events = newEvents;
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
  },
};
</script>
