"use strict";

const generatePassword = document.getElementById("password-generator");
const passwordOutput = document.querySelector(".password");
const copyToClipboard = document.querySelector(".copy");

// credentails list

const passwordLength = document.getElementById("pass-length");
const isPasswordupper = document.getElementById("pass-upper");
const isPasswordLower = document.getElementById("pass-lower");
const isPasswordNumber = document.getElementById("pass-number");
const isPasswordSymbols = document.getElementById("pass-symbols");
const checkInput = document.querySelectorAll("input[type='checkbox']");


copyToClipboard.addEventListener("click", function () {

  navigator.clipboard.writeText(passwordOutput.textContent);

  document.querySelector(".copied").classList.add("active");

  setTimeout(() => {

    document.querySelector(".copied").classList.remove("active");
  }, 1400);

});

generatePassword.addEventListener("click", function () {
  passwordOutput.textContent = createPassword(passwordLength.value, isPasswordupper.checked, isPasswordLower.checked, isPasswordNumber.checked, isPasswordSymbols.checked);
});


const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
const specialChar = "!@#$&*";

const randomUpper = () => { return String.fromCharCode(randomInt(64, 90)) }
const randomLower = () => { return String.fromCharCode(randomInt(96, 122)) }
const randomNumber = () => { return randomInt(-1, 9) }
const randomSymbol = () => { return specialChar[randomInt(-1, specialChar.length - 1)] }

const randomFuncCalling = {
  "upper": randomUpper,
  "lower": randomLower,
  "number": randomNumber,
  "symbol": randomSymbol
}


const createPassword = function (length, upper, lower, number, symbol) {

  const passwordTypes = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  // console.log(passwordTypes.length);

  let passwordCreated = "";

  for (let i = 0; i < length;) {
    passwordTypes.forEach(pass => {
      // console.log(i);
      if (i >= length) {
        return passwordCreated;
      }
      i++;
      passwordCreated += randomFuncCalling[Object.keys(pass)]();
    });
  }

  return passwordCreated;
}