// eventListeners
const form = document.querySelector('.js_calculator');
form.addEventListener('submit', setData ,false);

const cleaner = document.querySelector('.js_cleaner');
cleaner.addEventListener('click', (e) => {
  e.preventDefault();
  clearData();
}, false)

// locaStorage
const oldData = JSON.parse(localStorage.getItem('BMI-data'));
let  BMI_Data = oldData || [];

function setData() {
  const userHeight = document.querySelector('#userHeight').value;
  const userWeight = document.querySelector('#userWeight').value;
  
  if (userHeight <= 0 || userWeight <= 0) {
    alert('請填入正確的身高、體重。');
    return;
  }
  
  const BMI = getBMI(userHeight, userWeight);  
  setLocalStorage(BMI, userHeight, userWeight);
}

function getBMI(height, weight) {
  height = height / 100;
  let BMI = weight / Math.pow(height, 2);
  BMI = + (Math.round(BMI + 'e+2') + 'e-2');
  return BMI;
}

function setLocalStorage(b, h, w) {
  const d = moment().format('MM-DD-YYYY'); 
  const item = {
    BMI: b,
    height: h,
    weight: w,
    date: d,
  };
  BMI_Data.push(item);
  const str = JSON.stringify(BMI_Data);
  localStorage.setItem('BMI-data', str);
}

function clearData() {
  BMI_Data = [];
  const str = JSON.stringify(BMI_Data);
  localStorage.setItem('BMI-data', str);
  
  // render function
}

// renderfunction

