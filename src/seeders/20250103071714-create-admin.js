"use strict";
import bcrypt from "bcryptjs";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const hashedPassword = bcrypt.hashSync("123456789");
  return queryInterface.bulkInsert(
    "Users",
    [
      {
        firstName: "Linh",
        lastName: "Lâm Vũ",
        email: "vulinh.lam@hotmail.com",
        password: hashedPassword,
        address: "Công ty TNHH Riken Việt Nam, đường N2 KCN Sóng Thần 3 ",
        district: "Thành Phố Thủ Dầu Một",
        city: "Bình Dương",
        country: "Việt Nam",
        phone: "0878702567",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
}
