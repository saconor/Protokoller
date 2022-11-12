module.exports =  (sequelize, Sequelize) => {
  const Team = sequelize.define('team', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type:Sequelize.BOOLEAN,                     
    }
  });
 

    return  Team;
};
