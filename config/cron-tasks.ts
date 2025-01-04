import addLessons from "../src/cron.server";

export default {
  myJob: {
    task: async ({ strapi }) => {
      const date = new Date();
      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();

      console.log("Cron job started");

      const newDays = new Date(currentYear, currentMonth + 1, 1, 0, 0);

      console.log("newDays.getMonth(): ", newDays.getMonth());
      console.log("currentMonth + 1: ", currentMonth + 1);
      console.log("newDays.getFullYear(): ", newDays.getFullYear());

      while (
        newDays.getMonth() === currentMonth + 1 &&
        newDays.getFullYear() === 2025
      ) {
        // MAANDAG
        if (newDays.getDay() === 1) {
          await addLessons(newDays, 9, 30, 1, 6); // Date, hour, minutes, classId, capacity
          await addLessons(newDays, 12, 30, 2, 6);
          await addLessons(newDays, 19, 0, 3, 6);
        }
        // DINSDAG
        if (newDays.getDay() === 2) {
          await addLessons(newDays, 19, 0, 4, 6);
        }
        // DONDERDAG
        if (newDays.getDay() === 4) {
          await addLessons(newDays, 9, 30, 5, 6);
          await addLessons(newDays, 12, 30, 6, 7);
          await addLessons(newDays, 19, 0, 7, 6);
        }
        // VRIJDAG
        if (newDays.getDay() === 5) {
          await addLessons(newDays, 9, 30, 8, 6);
          await addLessons(newDays, 12, 30, 9, 6);
        }
        // ZATERDAG
        if (newDays.getDay() === 6) {
          await addLessons(newDays, 10, 0, 10, 6);
        }

        newDays.setDate(newDays.getDate() + 1);
      }

      console.log("Cron job finished");
    },
    options: {
      rule: "0 6 1 * *",
      tz: "Europe/Amsterdam",
    },
  },
};
