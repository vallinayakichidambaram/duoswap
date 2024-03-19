const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BAD_Token", (m) => {
  const token = m.contract("BAD", []);

  return { token };
})