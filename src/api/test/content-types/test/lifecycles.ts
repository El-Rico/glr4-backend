// import moment from "moment";

// export default {
//   async beforeUpdate(event) {
//     const date = new Date();
//     const currentMonth = date.getMonth();
//     const currentYear = date.getFullYear();
//     if (!event.params.data.trigger) console.log("no trigger set");
//     console.log("currentMonth: ", currentMonth);
//     console.log("currentYear: ", currentYear);
//     console.log(event.params.data);
//     const newDays = new Date(currentYear, currentMonth + 1, 1 + 1, 0, 0);
//     console.log("newDays: ", newDays);
//     console.log("newDays.getMonth(): ", newDays.getMonth());
//     console.log("newDays.getFullYear(): ", newDays.getFullYear());
//     while (
//       newDays.getMonth() === currentMonth + 1 &&
//       newDays.getFullYear() === 2024
//     ) {
//       if (newDays.getDay() === 1) {
//         // Mondays
//         // MA - 12 uur
//         const dateMA1 = new Date(
//           newDays.getFullYear(),
//           newDays.getMonth(),
//           newDays.getDate(),
//           12,
//           0,
//         );

//         const weekNumber = moment(dateMA1, "MM-DD-YYYY").week();
//         const filterEvenOdd = weekNumber % 2 === 0 ? "odd" : "even";

//         const classData = await strapi.entityService.findOne(
//           "api::class.class",
//           1,
//           {
//             populate: { users_permissions_users: true },
//           },
//         );

//         // Filter alle cursisten die niet elke week komen
//         const filteredClassData = classData.users_permissions_users.filter(
//           (user) => user.occupation !== filterEvenOdd,
//         );

//         let userIds = [];
//         filteredClassData.map((user) => userIds.push(user.id));

//         const entry = await strapi.entityService.create("api::lesson.lesson", {
//           data: {
//             date: dateMA1.toISOString(),
//             capacity: 6,
//             class: 1,
//             users_permissions_users: userIds,
//             publishedAt: Date.now(),
//           },
//         });
//       }
//       newDays.setDate(newDays.getDate() + 1);
//     }
//   },
// };
