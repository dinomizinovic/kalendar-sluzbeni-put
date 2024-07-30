export const dialogStore = {
  namespaced: true,
  state: {
    statusDialog: false,
    periodRegDialog: false,
    destinationsDialog: false,
    depositDialog: false,
    vehicleDialog: false,
    sleepingDialog: false,
    foodIncludedDialog: false,
  },
  mutations: {
    setStatusDialog(state, value) {
      state.statusDialog = value;
    },
    setPeriodRegDialog(state, value) {
      state.periodRegDialog = value;
    },
    setDestinationsDialog(state, value) {
      state.destinationsDialog = value;
    },
    setDepositDialog(state, value) {
      state.depositDialog = value;
    },
    setVehicleDialog(state, value) {
      state.vehicleDialog = value;
    },
    setSleepingDialog(state, value) {
      state.sleepingDialog = value;
    },
    setStatusDialogToTrue(state) {
      state.statusDialog = true;
    },
    setStatusDialogToFalse(state) {
      state.statusDialog = false;
    },
    setPeriodRegDialogToTrue(state) {
      state.periodRegDialog = true;
    },
    setPeriodRegDialogToFalse(state) {
      state.periodRegDialog = false;
    },
    setDestinationsDialogToTrue(state) {
      state.destinationsDialog = true;
    },
    setDestinationsDialogToFalse(state) {
      state.destinationsDialog = false;
    },
    setDepositDialogToTrue(state) {
      state.depositDialog = true;
    },
    setDepositDialogToFalse(state) {
      state.depositDialog = false;
    },
    setVehicleDialogToTrue(state) {
      state.vehicleDialog = true;
    },
    setVehicleDialogToFalse(state) {
      state.vehicleDialog = false;
    },
    setSleepingDialogToTrue(state) {
      state.sleepingDialog = true;
    },
    setFoodIncludedDialogToTrue(state) {
      state.foodIncludedDialog = true;
    },
    setFoodIncludedDialogToFalse(state) {
      state.foodIncludedDialog = false;
    },
    setSleepingDialogToFalse(state) {
      state.sleepingDialog = false;
    },
  },
};
