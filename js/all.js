// eventListeners
const form = document.querySelector('.js_calculator');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  proceedData()
},false);
const cleaner = document.querySelector('.js_cleaner');
cleaner.addEventListener('click', (e) => {
  e.preventDefault();
  eraseData();
}, false)

// locaStorage
const oldData = JSON.parse(localStorage.getItem('BMI-data'));
let  BMI_Data = oldData || [];

// init
init();

function init() {
  renderContent();
}

// proceeding function
function proceedData() {
  const userHeight = document.querySelector('#userHeight').value;
  const userWeight = document.querySelector('#userWeight').value;
  document.querySelector('#userHeight').value ='';
  document.querySelector('#userWeight').value ='';
  
  if (userHeight <= 0 || userWeight <= 0) {
    alert('請填入正確的身高、體重。');
    return;
  }
  
  const BMI = getBMI(userHeight, userWeight);  
  setLocalStorage(BMI, userHeight, userWeight);
  renderContent();
  renderBtn();
}

// BMI
function getBMI(height, weight) {
  height = height / 100;
  let BMI = weight / Math.pow(height, 2);
  BMI = + (Math.round(BMI + 'e+2') + 'e-2');
  return BMI;
}

function BMI_determ(BMI) {
  if (BMI < 18.5) {
    return ['過輕', 'thiness'];    
  } else if (18.5 <= BMI && BMI <= 25) {
    return ['理想', 'normal'];
  } else if (25 < BMI && BMI <= 30) {
    return ['過重', 'overweight'];
  } else if (30 < BMI && BMI <= 35) {
    return ['輕度肥胖', 'obese1'];
  } else if (35 < BMI && BMI <= 40) {
    return ['中度肥胖', 'obese2'];
  } else {
    return ['嚴重肥胖', 'obese3'];
  }
}

// proceed localStorage
function setLocalStorage(userBMI, userHeight, userWeight) {
  const result = BMI_determ(userBMI);
  const today = moment().format('MM-DD-YYYY'); 
  const item = {
    determ: result,
    BMI: userBMI,
    height: userHeight,
    weight: userWeight,
    date: today,
  };
  BMI_Data.push(item);
  const str = JSON.stringify(BMI_Data);
  localStorage.setItem('BMI-data', str);
}

// cleaner
function eraseData() {
  BMI_Data = [];
  const str = JSON.stringify(BMI_Data);
  localStorage.setItem('BMI-data', str);
  
  // render function
  renderContent();
  renderBtn();
}

// render functions
function renderContent() {
  const table = document.querySelector('.js_result');
  let str = '';
  for (let i = BMI_Data.length - 1; i >= 0 ; i --) {
    str += `
      <tr class="${BMI_Data[i].determ[1]}">
        <td>${BMI_Data[i].determ[0]}</td>
        <td><span class="small">BMI</span>${BMI_Data[i].BMI}</td>
        <td><span class="small">weight</span>${BMI_Data[i].weight}kg</td>
        <td><span class="small">height</span>${BMI_Data[i].height}cm</td>
        <td><span class="small">${BMI_Data[i].date}</span></td>
      </tr>
    `;
  }
  table.innerHTML = str;
}

function renderBtn() {
  const submitBtn = document.querySelector('.js_submit');
  const rstBtn = document.querySelector('.js_rstBtn');
  const tag = document.querySelector('.js_determTag');
  const len = BMI_Data.length;

  if (len === 0) {
    submitBtn.style.display = 'block';
    rstBtn.style.display = 'none';
    tag.style.display = 'none';
  } else {
    submitBtn.style.display = 'none';
    rstBtn.style.display = 'block';
    tag.style.display = 'block';
    rstBtn.setAttribute('class', `rstBtn js_rstBtn ${BMI_Data[len - 1].determ[1]}`);
    tag.setAttribute('class', `determTag js_determTag ${BMI_Data[len - 1].determ[1]}`);
    const rst = document.querySelector('.js_rstBtn h2');
    rst.innerHTML = BMI_Data[len -1].BMI;
    tag.innerHTML = BMI_Data[len -1].determ[0];
  }
}
