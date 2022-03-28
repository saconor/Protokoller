module.exports =  (sequelize, Sequelize) => {
  const Meeting = sequelize.define('meeting', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    started_at: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    meeting_date: {
      type:Sequelize.DATE
    },
    duration: {
      type: Sequelize.INTEGER,
    },

  });
 

    return  Meeting;
};
