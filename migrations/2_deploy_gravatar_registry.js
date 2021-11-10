const GravatarRegistry = artifacts.require("GravatarRegistry");

module.exports = function (deployer) {
  deployer.deploy(GravatarRegistry, "Unknown", "QmT4D2Z1Pams5ADvnaPPAxiWETfKWiizA7rMisgeNZTL9k");
};
