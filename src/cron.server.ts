import moment from "moment";

export default async function addLessons(
  newDays,
  timeHour,
  timeMinutes,
  classId,
  capacity
) {
  const date = new Date(
    newDays.getFullYear(),
    newDays.getMonth(),
    newDays.getDate(),
    timeHour - 1,
    timeMinutes
  );

  const weekNumber = moment(date, "MM-DD-YYYY").week();
  const filterEvenOdd = weekNumber % 2 === 0 ? "odd" : "even";

  const classData = await strapi.documents("api::class.class").findOne({
    documentId: "ln1gkzs6ojl9d707xn6v86swssmw",
    populate: { users_permissions_users: true },
  });

  // Filter alle cursisten die niet elke week komen
  const filteredClassData = classData.users_permissions_users.filter(
    (user) => user.occupation !== filterEvenOdd
  );

  let userIds = [];
  filteredClassData.map((user) => userIds.push(user.id));

  const entry = await strapi.documents("api::lesson.lesson").create({
    data: {
      date: date.toISOString(),
      capacity: capacity,
      class: classId,
      users_permissions_users: userIds,
      publishedAt: Date.now(),
    },
  });
}
