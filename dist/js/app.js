'use strict';

// Create a Class of DatePicker

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DatePicker = function () {
  // constructor for date
  function DatePicker(month, year, firstDay) {
    var _this = this;

    _classCallCheck(this, DatePicker);

    // array with all the months in Strings
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // array with all the dayss from the week in Strings
    this.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    // creating new Date and passing month, year and first day of the month as arguments
    this.today = new Date(year, month, firstDay);
    // arrow function that returns how many days each month have
    this.numberDays = function () {
      // checks if month is February and if it's leap year
      if (_this.monthNum == 1) {
        // February only!
        if (_this.year % 4 === 0 && _this.year % 100 !== 0 || _this.year % 400 === 0) {
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
    this.html = '';
    // state of the datepicker opened/closed
    this.state = false;
    // returning string in format DD/MM/YYYY
    this.pickerValue = '';
  }
  // Methods
  // function to change UI and properties for prev month


  _createClass(DatePicker, [{
    key: 'prevMonth',
    value: function prevMonth() {
      // clear UI
      this.clearUI();
      // if statement to make sure monthNum is not less than 0 while changing months to prev
      if (this.monthNum === 0) {
        this.monthNum = 12;
        this.year--;
      }
      this.today = new Date(this.year, this.monthNum - 1, 1);
      this.monthNum = new Date(this.today).getMonth();
      this.month = this.months[new Date(this.today).getMonth()];
      this.firstDayOfWeek = this.today.getDay() === 0 ? 7 : this.today.getDay();
      this.numberDaysInMonth = this.numberDays()[new Date(this.today).getMonth()];
      // Init UI with new month
      this.init();
    }
    // function to change UI and properties for next month

  }, {
    key: 'nextMonth',
    value: function nextMonth() {
      this.clearUI();
      this.today = new Date(this.year, this.monthNum + 1, 1);
      this.monthNum = new Date(this.today).getMonth();
      // if statement to check whether monthNum hits last month and than set again to 0
      if (this.monthNum % 12 === 0) {
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

  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      // check if state is false and than initialize UI
      if (this.state === false) {
        (function () {
          var weekDaysTd = function weekDaysTd() {
            var html = '';
            _this2.days.forEach(function (x) {
              html += '\n            <td>\n              ' + x + '\n            </td>\n          ';
            });
            return html;
          };
          var daysRows = function daysRows() {
            var day = 1;
            var html = '';
            for (var i = 0; i < 9; i++) {
              html += '<tr>';
              for (var j = 1; j <= 7; j++) {
                html += '<td>';
                // if day <=
                if (day <= _this2.numberDaysInMonth && (i > 0 || j >= _this2.firstDayOfWeek)) {
                  var today = new Date().getDate();
                  var todaysMonth = new Date().getMonth();
                  var todaysYear = new Date().getFullYear();
                  if (day == today && _this2.monthNum == todaysMonth && _this2.year == todaysYear) {
                    html += '<span class="today">' + day + '</span>';
                    day++;
                  } else {
                    html += '' + day;
                    day++;
                  }
                }
                html += '</td>';
              }
              if (day > _this2.numberDaysInMonth) {
                break;
              }
              html += '</tr>';
            }
            return html;
          };
          _this2.html = '\n        <table Class="calendar">\n          <thead>\n            <tr class="table-header">\n              <th colspan="7">\n              <span id=\'prev-month\' onClick="n.prevMonth()">&#8630;</span><span class="month-year">' + _this2.month + ' &nbsp; ' + _this2.year + '</span><span id=\'next-month\' onClick="n.nextMonth()">&#8631;</span>\n              </th>\n            </tr>\n            <tr class="weekdays">' + weekDaysTd() + '</tr>\n          </thead>\n          <tbody>' + daysRows() + '</tbody>\n        </table>\n      ';
          var calendarDiv = document.getElementById('calendar');
          calendarDiv.innerHTML += '\n        <div>\n          ' + _this2.html + '\n        </div>\n      ';
          _this2.state = true;
          var tds = document.querySelectorAll('tbody tr td');
          // arrow function that checks if monthNum is < 10 and if it is add 0 to the beggining of the string
          var monthToPass = function monthToPass() {
            var month = _this2.monthNum + 1;
            if (month === 10 || month === 11 || month === 12) {
              return month;
            } else {
              return '0' + month;
            }
          };
          var yearToPass = _this2.year;
          // adding click listener to each TD

          var _loop = function _loop(i) {
            tds[i].addEventListener('click', function (e) {
              // check if TD have a value inside
              if (tds[i].innerHTML) {
                var dateToPass = e.target.innerHTML;
                if (Number(dateToPass) < 10) {
                  dateToPass = '0' + dateToPass;
                } else {
                  dateToPass = dateToPass;
                }
                // set pickerValue to selected date
                _this2.pickerValue = dateToPass + '/' + monthToPass() + '/' + yearToPass;
                document.querySelector('input[name="datepicker"]').setAttribute('value', _this2.pickerValue);
                _this2.clearUI();
              }
            });
          };

          for (var i = 0; i < tds.length; i++) {
            _loop(i);
          }
          // if UI state is true, clearUI
        })();
      } else {
        this.clearUI();
      }
    }
  }, {
    key: 'clearUI',
    value: function clearUI() {
      document.getElementById('calendar').innerHTML = '';
      this.state = false;
    }
  }]);

  return DatePicker;
}();
// current year


var year = new Date().getFullYear();
// Current month
var month = new Date().getMonth();
// creating new DatePicker class and pass current year and month as arguments
var n = new DatePicker(month, year, 1);

// initialize DatePicker on input click
document.querySelector('input[name="datepicker"]').addEventListener('click', function () {
  n.init();
});

// adding event listener to submit button and alerts all the POST information
document.querySelector('input[type="submit"]').addEventListener('click', function (e) {
  e.preventDefault();
  var textNode = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(e.target.form)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      textNode += e.target.form[item].name + ' ' + e.target.form[item].value + '\n';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  alert(textNode);
});