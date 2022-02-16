const { expect } = require("chai");
const { Contract } = require("ethers");

const { ethers } = require("hardhat");

let color;

before(async () => {
  const Color = await ethers.getContractFactory("Color");
  color = await Color.deploy();
  await color.deployed();
});

describe("deployment", function () {
  it("deploys successfully", async function () {
    const address = color.address;
    expect(address).to.not.equal(0x0);
    expect(address).to.not.equal("");
    expect(address).to.not.equal(null);
    expect(address).to.not.equal(undefined);
  });

  it("has a name", async function () {
    const name = await color.name();
    expect(name).to.equal("Color");
  });

  it("has a symbol", async function () {
    const symbol = await color.symbol();
    expect(symbol).to.equal("CLR");
  });
});

describe("minting", function () {
  (async () => {
    const [owner] = await ethers.getSigners();

    it("creates a new token", async function () {
      const result = await color.mint("#FFF000");
      const ownerBalance = await color.balanceOf(owner.address);

      //SUCCESS
      expect(ownerBalance).to.equal(1);

      //FAILURE
      await expect(color.mint("#FFF000")).to.be.reverted;
    });
  })();
});

describe("indexing", async () => {
  const [owner] = await ethers.getSigners();

  it("lists colors", async () => {
    await color.mint("#FFFFFF");
    await color.mint("#000000");

    const totalSupply = await color.balanceOf(owner.address);

    let colorCode;
    let result = [];
    for (var i = 0; i < totalSupply; i++) {
      colorCode = await color.colors(i);
      result.push(colorCode);
    }

    let expected = ["#FFF000", "#FFFFFF", "#000000"];
    expect(result.join(","), expected.join(","));
  });
});
