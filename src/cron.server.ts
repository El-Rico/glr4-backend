import moment from "moment";

export default async function addLessons(
  newDays,
  timeHour,
  timeMinutes,
  classId,
  capacity,
) {
  const date = new Date(
    newDays.getFullYear(),
    newDays.getMonth(),
    newDays.getDate(),
    timeHour,
    timeMinutes,
  );

  const weekNumber = moment(date, "MM-DD-YYYY").week();
  const filterEvenOdd = weekNumber % 2 === 0 ? "odd" : "even";

  const classData = await strapi.entityService.findOne(
    "api::class.class",
    classId,
    {
      populate: { users_permissions_users: true },
    },
  );

  // Filter alle cursisten die niet elke week komen
  const filteredClassData = classData.users_permissions_users.filter(
    (user) => user.occupation !== filterEvenOdd,
  );

  let userIds = [];
  filteredClassData.map((user) => userIds.push(user.id));

  const entry = await strapi.entityService.create("api::lesson.lesson", {
    data: {
      date: date.toISOString(),
      capacity: capacity,
      class: classId,
      users_permissions_users: userIds,
      publishedAt: Date.now(),
    },
  });
}
