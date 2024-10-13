export default {
  async beforeUpdate(event) {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    if (!event.params.data.trigger) console.log("no trigger set");

    const newDays = new Date(currentYear, currentMonth + 1, 1 + 1, 0, 0);

    while (
      newDays.getMonth() === currentMonth + 1 &&
      newDays.getFullYear() === 2024
    ) {
      if (newDays.getDay() === 1) {
        // Mondays
        // MA - 12 uur
        const dateMA1 = new Date(
          newDays.getFullYear(),
          newDays.getMonth(),
          newDays.getDate(),
          12,
          0,
        );

        const entry = await strapi.entityService.create("api::lesson.lesson", {
          data: {
            date: dateMA1.toISOString(),
            capacity: 6,
            class: 1,
            publishedAt: Date.now(),
          },
        });
      }

      newDays.setDate(newDays.getDate() + 1);
    }
  },
};
