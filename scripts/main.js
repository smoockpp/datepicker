'use strict';


// Create a Class of DatePicker

class DatePicker {
  // constructor for date
  constructor(month, year, firstDay) {
    // array with all the months in Strings
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // array with all the dayss from the week in Strings
    this.days = [
      'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ];
    // creating new Date and passing current month, current year and first day of the month as arguments
    this.today = new Date(year, month, firstDay);
    // arrow function that returns how many days each month have
    this.numberDays = () => {
      // checks if month is February and if it's leap year
      if (this.monthNum == 1 ) { // February only!
        if ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0){
          return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
      }
      // else returns for non leap year
      return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    };
    this.monthNum = new Date(this.today).getMonth();
    // Current year
    this.year = new Date(this.today).getFullYear();
    // Current month in String
    this.month = this.months[new Date(this.today).getMonth()];
    // Current day from the week
    this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
    // Number of days in current month
    this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
    // Current date
    this.dayDate = new Date().getDate();
    this.html = ``;
    this.state = false;
    this.pickerValue = '';
  }
  // Methods
  prevMonth() {
    this.clearUI();
    if (this.monthNum === 0) {
      this.monthNum = 12;
      this.year--;
    }
    this.today = new Date(this.year,this.monthNum-1, 1);
    console.log(this.monthNum);
    this.monthNum = new Date(this.today).getMonth();
    // Current month in String
    this.month = this.months[new Date(this.today).getMonth()];
    // Current day from the week
    this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
    // Number of days in current month
    this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
    // Current new Date()
    this.init();
  }
  nextMonth() {
    this.clearUI();
    this.today = new Date(this.year,this.monthNum+1, 1);
    this.monthNum = new Date(this.today).getMonth();
    if (this.monthNum % 12 === 0 ) {
      this.monthNum = 0;
      this.year++;
    }

    // Current month in String
    this.month = this.months[new Date(this.today).getMonth()];
    // Current day from the week
    this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
    // Number of days in current month
    this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
    // Current new Date()
    this.init();
  }
  // Method to initialize UI
  init() {
    if ( this.state === false ) {
      let weekDaysTd = () => {
        let html = ``;
        this.days.forEach(function(x) {
          html += `
            <td>
              ${x}
            </td>
          `;
        });
        return html;
      };
      let daysRows = () => {
        let day = 1;
        let html = ``;
        for (let i = 0; i < 9; i++) {
          html += `<tr>`
          for (let j = 1; j <= 7; j++) {
            html += `<td>`;
            // if day <=
            if (day <= this.numberDaysInMonth && (i > 0 || j >= this.firstDayOfWeek)) {
              let today = new Date().getDate();
              let todaysMonth = new Date().getMonth();
              let todaysYear = new Date().getFullYear();
              if (day == today && this.monthNum == todaysMonth && this.year == todaysYear) {
                html += `<span class="today">${day}</span>`;
                day++;
              } else {
                html += `${day}`;
                day++;
              }
            }
            html += `</td>`;
          }
          if (day > this.numberDaysInMonth) {
            break;
          }
          html += `</tr>`;
        }
        return html;
      };
      this.html = `
        <table Class="calendar">
          <thead>
            <tr class="table-header">
              <th colspan="7">
              <span id='prev-month' onClick="n.prevMonth()">&#8630;</span><span class="month-year">${this.month} &nbsp; ${this.year}</span><span id='next-month' onClick="n.nextMonth()">&#8631;</span>
              </th>
            </tr>
            <tr class="weekdays">${weekDaysTd()}</tr>
          </thead>
          <tbody>${daysRows()}</tbody>
        </table>
      `;
      let calendarDiv = document.getElementById('calendar');
      calendarDiv.innerHTML += `
        <div>
          ${this.html}
        </div>
      `;
      this.state = true;
      const tds = document.querySelectorAll('tbody tr td');
      const monthToPass = () => {
        let month = this.monthNum + 1;
        if (month === 10 || month === 11 || month === 12) {
          return month;
        } else {
          return ('0' + month);
        }
      }
      const yearToPass = this.year;
      for (let i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', (e) => {
          if (tds[i].innerHTML) {
            let dateToPass = e.target.innerHTML;
            if ((Number(dateToPass)) < 10) {
              dateToPass = '0' + dateToPass;
            } else {
              dateToPass;
            }
            this.pickerValue = dateToPass + '/' + monthToPass() + '/' + yearToPass;
            document.querySelector('input[name="datepicker"]').setAttribute('value', this.pickerValue);

            this.clearUI();
            console.log(this.pickerValue);
          }
        });
      }
    } else {
      this.clearUI();
    }
  }
  clearUI() {
    document.getElementById('calendar').innerHTML = '';
    this.state = false;
  }
}

let year = new Date().getFullYear();
let month = new Date().getMonth();
let n = new DatePicker(month, year, 1);

// console.log(n.firstDayOfWeek);
document.querySelector('input[name="datepicker"]').addEventListener('click', function() {
  n.init();

});

document.querySelector('input[type="submit"]').addEventListener('click', function(e) {
  e.preventDefault();
  let textNode = '';
  for (const item of Object.keys(e.target.form)) {
    textNode += e.target.form[item].name + ' ' + e.target.form[item].value + '\n';
  }
  alert(textNode);
});


// module.exports = new DatePicker();
