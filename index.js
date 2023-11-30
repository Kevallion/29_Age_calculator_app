import { differenceInMonths } from "https://cdn.skypack.dev/date-fns";
import { differenceInDays } from "https://cdn.skypack.dev/date-fns";
import { differenceInYears } from "https://cdn.skypack.dev/date-fns";

//on passe les inputs dans une array

const inputs = document.querySelectorAll("input");
const dateNow = new Date();
let dateUser;
let inputDate = {
  day: false,
  month: false,
  year: false,
};

//pour gerer les message
function checkInput(valid, target, message) {
  const span = document.querySelector(`#${target.id} + span`);
  if (!valid) {
    target.classList.add("error");
    span.textContent = message;
    inputDate[`${target.id}`] = false;
  } else if (valid) {
    target.classList.remove("error");
    span.textContent = message;
    if (target.value.length > 0) {
      inputDate[`${target.id}`] = true;
    } else {
      inputDate[`${target.id}`] = false;
    }
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    //un cas selon l'élément
    switch (e.target.id) {
      case "day":
        if (
          e.target.value > 31 ||
          (e.target.value.length > 0 && !e.target.value.match(/[/^\d+$/]/))
        ) {
          checkInput(false, e.target, "Must be a valid day");
        } else {
          checkInput(true, e.target, "");
        }
        break;
      case "month":
        if (
          e.target.value > 12 ||
          (e.target.value.length > 0 && !e.target.value.match(/[/^\d+$/]/))
        ) {
          checkInput(false, e.target, "Must be a Month");
        } else {
          checkInput(true, e.target, "");
        }
        break;
      case "year":
        if (e.target.value.length > 0 && !e.target.value.match(/[/^\d+$/]/)) {
          checkInput(false, e.target, "Must be a year");
        } else if (e.target.value > dateNow.getFullYear()) {
          checkInput(false, e.target, "Must be in the past");
        } else {
          checkInput(true, e.target, "");
        }

        break;
      default:
        null;
    }
  });
});
function isInCalender(year, month, day) {
  const lastDay = new Date(year, month, 0).getDate();
  if (day > lastDay) {
    return false;
  } else {
    return true;
  }
}

btnCalculator.addEventListener("click", () => {
  if (inputDate.day && inputDate.month && inputDate.year) {
    if (isInCalender(year.value, month.value, day.value)) {
      dateUser = new Date(year.value, month.value - 1, day.value);
      const diffStamp =
        Date.now() - Date.parse(`${year.value}-${month.value}-${day.value}`);
      resultDay.innerText = Math.ceil(diffStamp / (24 * 60 * 60 * 1000));
      resultMonth.innerText = differenceInMonths(dateNow, dateUser);
      resultYear.innerText = differenceInYears(dateNow, dateUser);
    } else {
      checkInput(false, day, "Must be a valid date");
    }
  } else if (!day.value && !month.value && !year.value) {
    checkInput(false, day, "This field is required");
    checkInput(false, month, "This field is required");
    checkInput(false, year, "This field is required");
  }
});
