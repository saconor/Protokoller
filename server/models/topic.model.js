// STARTING_TIME: this.meetingStart.format('HH:mm:ss'),
// MEETING_TITLE: 'Meeting Minutes',
// MEETING_DATE: this.meetingStart.format('dd,DD.MM.YYYY'),
// DURATION: this.meetinTime,
// TEILNEHMER: this.userList,
// DETAILS: this.topicList,

module.exports = (sequelize, Sequelize) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Topic = sequelize.define('topic', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    details: {
      type: Sequelize.STRING,
    },
  });
  return Topic;
};
