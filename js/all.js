const oldData = JSON.parse(localStorage.getItem('BMI-data'));
const  BMI_Data = oldData || [];

function setData() {
  let height = document.querySelector('#userHeight').value;
  const weight = document.querySelector('#userWeight').value;

  if (height <= 0 || weight <= 0) {
    alert('請填入正確的身高、體重。')
    return;
  }

  const BMI = getBMI(height, weight);
  setLocalStorage(BMI, height, weight);
}

function getBMI(h, w) {
  h = h / 100;
  let BMI = w / Math.pow(h, 2);
  BMI = + (Math.round(BMI + 'e+2') + 'e-2');
  console.log(BMI); 
  return BMI;
}

function setLocalStorage(b, h, w) {
  const item = {
    BMI: b,
    height: h,
    weight: w,
  };
  BMI_Data.push(item);
  const str = JSON.stringify(BMI_Data);
  localStorage.setItem('BMI-data', str);
}


const form = document.querySelector('.js_calculator');
form.addEventListener('submit', setData, false);