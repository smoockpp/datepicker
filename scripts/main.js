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
    // creating new Date and passing month, year and first day of the month as arguments
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
    // Current month returned as Integer
    this.monthNum = new Date(this.today).getMonth();
    // Current year returned as integer
    this.year = new Date(this.today).getFullYear();
    // Current month in String
    this.month = this.months[new Date(this.today).getMonth()];
    // setting first day of the weeek to be Monday
    this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
    // Number of days in  month
    this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
    // Current date
    this.dayDate = new Date().getDate();
    // html template for rendering the UI
    this.html = ``;
    // state of the datepicker opened/closed
    this.state = false;
    // returning string in format DD/MM/YYYY
    this.pickerValue = '';
  }
  // Methods
  // function to change UI and properties for prev month
  prevMonth() {
    // clear UI
    this.clearUI();
    // if statement to make sure monthNum is not less than 0 while changing months to prev
    if (this.monthNum === 0) {
      this.monthNum = 12;
      this.year--;
    }
    this.today = new Date(this.year,this.monthNum-1, 1);
    this.monthNum = new Date(this.today).getMonth();
    this.month = this.months[new Date(this.today).getMonth()];
    this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
    this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
    // Init UI with new month
    this.init();
  }
  // function to change UI and properties for next month
  nextMonth() {
    this.clearUI();
    this.today = new Date(this.year,this.monthNum+1, 1);
    this.monthNum = new Date(this.today).getMonth();
    // if statement to check whether monthNum hits last month and than set again to 0
    if (this.monthNum % 12 === 0 ) {
      this.monthNum = 0;
      this.year++;
    }
    this.month = this.months[new Date(this.today).getMonth()];
    this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
    this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
    // Init UI with new month
    this.init();
  }
  // Method to create the HTML template and initialize UI
  init() {
    // check if state is false and than initialize UI
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
              <span id='prev-month' onClick="datepicker.prevMonth()">&#10094;</span><span class="month-year">${this.month} &nbsp; ${this.year}</span><span id='next-month' onClick="datepicker.nextMonth()">&#10095;</span>
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
      // arrow function that checks if monthNum is < 10 and if it is add 0 to the beggining of the string
      const monthToPass = () => {
        let month = this.monthNum + 1;
        if (month === 10 || month === 11 || month === 12) {
          return month;
        } else {
          return ('0' + month);
        }
      }
      const yearToPass = this.year;
      // adding click listener to each TD
      for (let i = 0; i < tds.length; i++) {
        tds[i].addEventListener('click', (e) => {
          // check if TD have a value inside
          if (tds[i].innerHTML) {
            let dateToPass = e.target.innerHTML;
            if ((Number(dateToPass)) < 10) {
              dateToPass = '0' + dateToPass;
            } else {
              dateToPass = dateToPass;
            }
            // set pickerValue to selected date
            this.pickerValue = dateToPass + '/' + monthToPass() + '/' + yearToPass;
            document.querySelector('input[name="datepicker"]').setAttribute('value', this.pickerValue);
            this.clearUI();
          }
        });
      }
    // if UI state is true, clearUI
    } else {
      this.clearUI();
    }
  }
  clearUI() {
    document.getElementById('calendar').innerHTML = '';
    this.state = false;
  }
}
// current year
let year = new Date().getFullYear();
// Current month
let month = new Date().getMonth();
// creating new DatePicker class and pass current year and month as arguments
let datepicker = new DatePicker(month, year, 1);

// initialize DatePicker on input click
document.querySelector('input[name="datepicker"]').addEventListener('click', function() {
  datepicker.init();
});

// adding event listener to submit button and alerts all the POST information
document.querySelector('input[type="submit"]').addEventListener('click', function(e) {
  e.preventDefault();
  // Validation of form
  const destination = document.getElementById('destination').selectedIndex;
  const date = document.getElementById('datepicker').getAttribute('value');
  const duration = document.getElementById('duration').selectedIndex;
  const adults = document.getElementById('adults').selectedIndex;
  const children = document.getElementById('children').selectedIndex;
  if ( destination == 0 || date == '' || duration == 0 || adults == 0 || children == 0) {
    alert('Please fill in all the fields.')
  } else {
    let textNode = '';
    for (const item of Object.keys(e.target.form)) {
      textNode += e.target.form[item].name + ' ' + e.target.form[item].value + '\n';
    }
    alert(textNode);
  }

});
