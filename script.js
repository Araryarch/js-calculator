const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const buttonContent = button.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = display.dataset.previousKeyType;

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = buttonContent;
      } else {
        display.textContent = displayedNum + buttonContent;
      }
    }

    if (action === 'operator') {
      display.dataset.firstValue = displayedNum;
      display.dataset.operator = buttonContent;
      display.dataset.previousKeyType = 'operator';
    }

    if (action === 'clear') {
      display.textContent = '';
      delete display.dataset.firstValue;
      delete display.dataset.operator;
      delete display.dataset.previousKeyType;
    }

    if (action === 'delete') {
      display.textContent = displayedNum.slice(0, -1);
    }

    if (action === 'calculate') {
      const firstValue = display.dataset.firstValue;
      const operator = display.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);
    }

    display.dataset.previousKeyType = action;
  });
});

function calculate(first, operator, second) {
  first = parseFloat(first);
  second = parseFloat(second);

  if (operator === '+') return first + second;
  if (operator === '-') return first - second;
  if (operator === '*') return first * second;
  if (operator === '/') return first / second;
}
