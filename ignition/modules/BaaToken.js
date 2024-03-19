const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BAA_Token", (m) => {
  const token = m.contract("BAA", []);

  return { token };
})