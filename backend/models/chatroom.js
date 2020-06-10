'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    'ChatRoom',
    {
      name: DataTypes.STRING
    },
    {}
  );
  ChatRoom.associate = function (models) {
    ChatRoom.hasMany(models.ChatRoomMessage, {
      foreignKey: 'chatRoomId',
      sourceKey: 'id'
    });
  };
  return ChatRoom;
};
