import Vue from "vue";
import VueRouter from "vue-router";
import Calendar from "./../components/calendar/Calendar.vue";
import EventList from "./../components/calendar/CalendarEventList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/events",
    name: "EventList",
    component: EventList,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
