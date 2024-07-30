import Vue from "vue";

export const eventStore = {
  namespaced: true,
  state: {
    id: null,
    status: "Na obradi",
    deposit: null,
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
    start: null,
    end: null,
    eventDateOfCreation: null,
  },
  mutations: {
    setCurrentEvent(state, event) {
      state.id = event.id;
      state.status = event.status || "Na obradi";
      state.deposit = event.deposit;
      state.depositEndDate = event.depositEndDate;
      state.vehicleInBAM = event.vehicleInBAM;
      state.sleeping = event.sleeping;
      state.sleepingCount = event.sleepingCount;
      state.foodIncluded = event.foodIncluded || false;
      state.sleepingPrice = event.sleepingPrice;
      state.vehicle = event.vehicle;
      state.travelerName = event.travelerName;
      state.selectPayment = event.selectPayment || "Karticom";
      state.registererFullName = event.registererFullName;
      state.name = event.name;
      state.details = event.details;
      state.startDate = event.startDate;
      state.startTime = event.startTime;
      state.startState = event.startState;
      state.startCity = event.startCity;
      state.endDate = event.endDate;
      state.endTime = event.endTime;
      state.endState = event.endState;
      state.endCity = event.endCity;
      state.start = `${event.startDate}T${event.startTime}`;
      state.end = `${event.endDate}T${event.endTime}`;
      state.eventDateOfCreation = event.eventDateOfCreation;
      state.editedAtTravelerName = event.editedAtTravelerName;
      state.editedAtDeposit = event.editedAtDeposit;
      state.editedAtDepositEndDate = event.editedAtDepositEndDate;
      state.editedAtVehicleInBAM = event.editedAtVehicleInBAM;
      state.editedAtSleeping = event.editedAtSleeping;
      state.editedAtSleepingCount = event.editedAtSleepingCount;
      state.editedAtFoodIncluded = event.editedAtFoodIncluded;
      state.editedAtSleepingPrice = event.editedAtSleepingPrice;
      state.editedAtVehicle = event.editedAtVehicle;
      state.editedAtRegistererFullName = event.editedAtRegistererFullName;
      state.editedAtSelectPayment = event.editedAtSelectPayment;
      state.editedAtName = event.editedAtName;
      state.editedAtStatus = event.editedAtStatus;
      state.editedAtDetails = event.editedAtDetails;
      state.editedAtStartDate = event.editedAtStartDate;
      state.editedAtStartTime = event.editedAtStartTime;
      state.editedAtEndDate = event.editedAtEndDate;
      state.editedAtEndTime = event.editedAtEndTime;
      state.editedAtStartState = event.editedAtStartState;
      state.editedAtStartCity = event.editedAtStartCity;
      state.editedAtEndState = event.editedAtEndState;
      state.editedAtEndCity = event.editedAtEndCity;
    },
    updateEventInStore(state, eventToUpdate) {
      const index = state.events.findIndex(
        (event) => event.id === eventToUpdate.id
      );
      if (index !== -1) {
        const currentDate = new Date().toISOString().slice(0, 16);

        const updatedEventWithState = {
          ...state.events[index],
          status: state.status,
          deposit: state.deposit,
          depositEndDate: state.depositEndDate,
          vehicleInBAM: state.vehicleInBAM,
          sleeping: state.sleeping,
          sleepingCount: state.sleepingCount,
          foodIncluded: state.foodIncluded,
          sleepingPrice: state.sleepingPrice,
          vehicle: state.vehicle,
          travelerName: state.travelerName,
          selectPayment: state.selectPayment,
          registererFullName: state.registererFullName,
          name: state.name,
          details: state.details,
          startDate: state.startDate,
          startTime: state.startTime,
          startState: state.startState,
          startCity: state.startCity,
          endDate: state.endDate,
          endTime: state.endTime,
          endState: state.endState,
          endCity: state.endCity,
          start: `${state.startDate}T${state.startTime}`,
          end: `${state.endDate}T${state.endTime}`,
          editedAtTravelerName:
            state.travelerName !== eventToUpdate.travelerName
              ? currentDate
              : state.editedAtTravelerName,
          editedAtDeposit:
            state.deposit !== eventToUpdate.deposit
              ? currentDate
              : state.editedAtDeposit,
          editedAtDepositEndDate:
            state.depositEndDate !== eventToUpdate.depositEndDate
              ? currentDate
              : state.editedAtDepositEndDate,
          editedAtVehicleInBAM:
            state.vehicleInBAM !== eventToUpdate.vehicleInBAM
              ? currentDate
              : state.editedAtVehicleInBAM,
          editedAtSleeping:
            state.sleeping !== eventToUpdate.sleeping
              ? currentDate
              : state.editedAtSleeping,
          editedAtSleepingCount:
            state.sleepingCount !== eventToUpdate.sleepingCount
              ? currentDate
              : state.editedAtSleepingCount,
          editedAtFoodIncluded:
            state.foodIncluded !== eventToUpdate.foodIncluded
              ? currentDate
              : state.editedAtFoodIncluded,
          editedAtSleepingPrice:
            state.sleepingPrice !== eventToUpdate.sleepingPrice
              ? currentDate
              : state.editedAtSleepingPrice,
          editedAtVehicle:
            state.vehicle !== eventToUpdate.vehicle
              ? currentDate
              : state.editedAtVehicle,
          editedAtRegistererFullName:
            state.registererFullName !== eventToUpdate.registererFullName
              ? currentDate
              : state.editedAtRegistererFullName,
          editedAtSelectPayment:
            state.selectPayment !== eventToUpdate.selectPayment
              ? currentDate
              : state.editedAtSelectPayment,
          editedAtName:
            state.name !== eventToUpdate.name
              ? currentDate
              : state.editedAtName,
          editedAtStatus:
            state.status !== eventToUpdate.status
              ? currentDate
              : state.editedAtStatus,
          editedAtDetails:
            state.details !== eventToUpdate.details
              ? currentDate
              : state.editedAtDetails,
          editedAtStartDate:
            state.startDate !== eventToUpdate.startDate
              ? currentDate
              : state.editedAtStartDate,
          editedAtStartTime:
            state.startTime !== eventToUpdate.startTime
              ? currentDate
              : state.editedAtStartTime,
          editedAtEndDate:
            state.endDate !== eventToUpdate.endDate
              ? currentDate
              : state.editedAtEndDate,
          editedAtEndTime:
            state.endTime !== eventToUpdate.endTime
              ? currentDate
              : state.editedAtEndTime,
          editedAtStartState:
            state.startState !== eventToUpdate.startState
              ? currentDate
              : state.editedAtStartState,
          editedAtStartCity:
            state.startCity !== eventToUpdate.startCity
              ? currentDate
              : state.editedAtStartCity,
          editedAtEndState:
            state.endState !== eventToUpdate.endState
              ? currentDate
              : state.editedAtEndState,
          editedAtEndCity:
            state.endCity !== eventToUpdate.endCity
              ? currentDate
              : state.editedAtEndCity,
        };

        Vue.set(state.events, index, updatedEventWithState);
      }
    },
    removeEventById(state, eventId) {
      const index = state.events.findIndex((event) => event.id === eventId);
      if (index !== -1) {
        state.events.splice(index, 1);
      } else {
        console.error(`Event with ID ${eventId} not found.`);
      }
    },
    addEventToStore(state, event) {
      const start = `${event.startDate}T${event.startTime}`;
      const end = `${event.endDate}T${event.endTime}`;
      const eventDateOfCreation = new Date().toISOString().slice(0, 16);
      state.events.unshift({
        ...event,
        start,
        end,
        eventDateOfCreation,
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
      });
    },
    setStatus(state, value) {
      state.status = value;
    },
    setDeposit(state, value) {
      state.deposit = value;
    },
    setDepositEndDate(state, value) {
      state.depositEndDate = value;
    },
    setVehicleInBAM(state, value) {
      state.vehicleInBAM = value;
    },
    setSleeping(state, value) {
      state.sleeping = value;
    },
    setSleepingCount(state, value) {
      state.sleepingCount = value;
    },
    setFoodIncluded(state, value) {
      state.foodIncluded = value;
    },
    setSleepingPrice(state, value) {
      state.sleepingPrice = value;
    },
    setVehicle(state, value) {
      state.vehicle = value;
    },
    setTravelerName(state, value) {
      state.travelerName = value;
    },
    setSelectPayment(state, value) {
      state.selectPayment = value;
    },
    setRegistererFullName(state, value) {
      state.registererFullName = value;
    },
    setName(state, value) {
      state.name = value;
    },
    setDetails(state, value) {
      state.details = value;
    },
    setStartDate(state, value) {
      const date = value.slice(0, 10);
      state.startDate = date;
    },
    setStartTime(state, value) {
      const time = value.slice(-5);
      state.startTime = time;
    },
    setStartState(state, value) {
      state.startState = value;
    },
    setStartCity(state, value) {
      state.startCity = value;
    },
    setEndDate(state, value) {
      const date = value.slice(0, 10);
      state.endDate = date;
    },
    setEndTime(state, value) {
      const time = value.slice(-5);
      state.endTime = time;
    },
    setEndState(state, value) {
      state.endState = value;
    },
    setEndCity(state, value) {
      state.endCity = value;
    },
    resetEventState(state) {
      state.id = null;
      state.status = "Na obradi";
      state.deposit = null;
      state.depositEndDate = null;
      state.vehicleInBAM = null;
      state.sleeping = null;
      state.sleepingCount = null;
      state.foodIncluded = false;
      state.sleepingPrice = null;
      state.vehicle = null;
      state.travelerName = null;
      state.selectPayment = "Karticom";
      state.registererFullName = null;
      state.name = null;
      state.details = null;
      state.startDate = null;
      state.startTime = null;
      state.startState = null;
      state.startCity = null;
      state.endDate = null;
      state.endTime = null;
      state.endState = null;
      state.endCity = null;
      state.editedAtTravelerName = null;
      state.editedAtDeposit = null;
      state.editedAtDepositEndDate = null;
      state.editedAtVehicleInBAM = null;
      state.editedAtSleeping = null;
      state.editedAtSleepingCount = null;
      state.editedAtFoodIncluded = null;
      state.editedAtSleepingPrice = null;
      state.editedAtVehicle = null;
      state.editedAtRegistererFullName = null;
      state.editedAtSelectPayment = null;
      state.editedAtName = null;
      state.editedAtStatus = null;
      state.editedAtDetails = null;
      state.editedAtStartDate = null;
      state.editedAtStartTime = null;
      state.editedAtEndDate = null;
      state.editedAtEndTime = null;
      state.editedAtStartState = null;
      state.editedAtStartCity = null;
      state.editedAtEndState = null;
      state.editedAtEndCity = null;
    },
  },
};
