module.exports =  (sequelize, Sequelize) => {
  const Participants = sequelize.define('participants', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    userName: {
      type: Sequelize.STRING,
    },
    meeting_date: {
      type:Sequelize.DATE
    },
    started_at: {
      type: Sequelize.STRING,
    },
    ended_at: {
      type: Sequelize.STRING,
    },
    isGuest: {
      type:Sequelize.BOOLEAN,                     
    }
  });
 

    return  Participants;
};
