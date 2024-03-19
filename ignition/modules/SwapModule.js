const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SwapContract", (m) => {
  const token = m.contract("SwapExamples", []);

  return { token };
})