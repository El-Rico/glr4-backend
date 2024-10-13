export default {
  async beforeCreate(event) {
    const dateName = new Date(event.params.data.date).toDateString();
    const time = new Date(event.params.data.date).getHours();
    if (!event.params.data.datename) {
      event.params.data.datename = `${dateName} - ${time}:00u`;
    }
  },

  async beforeUpdate(event) {
    const dateName = new Date(event.params.data.date).toDateString();
    const time = new Date(event.params.data.date).getHours();
    if (!event.params.data.datename) {
      event.params.data.datename = `${dateName} - ${time}:00u`;
    }
  },
};
