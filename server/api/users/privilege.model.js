'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Privilege', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    privilege: DataTypes.STRING
  })
}

