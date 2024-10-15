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

  const classData = await strapi.entityService.findOne(
    "api::class.class",
    classId,
    {
      populate: { users_permissions_users: true },
    },
  );

  let userIds = [];
  classData.users_permissions_users.map((user) => userIds.push(user.id));

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
