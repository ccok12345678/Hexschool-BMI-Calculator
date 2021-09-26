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

// init
init();

function init() {
  renderContent();
}

function setData() {
  const userHeight = document.querySelector('#userHeight').value;
  const userWeight = document.querySelector('#userWeight').value;
  
  if (userHeight <= 0 || userWeight <= 0) {
    alert('請填入正確的身高、體重。');
    return;
  }
  
  const BMI = getBMI(userHeight, userWeight);  
  setLocalStorage(BMI, userHeight, userWeight);

  renderContent();
}

function getBMI(height, weight) {
  height = height / 100;
  let BMI = weight / Math.pow(height, 2);
  BMI = + (Math.round(BMI + 'e+2') + 'e-2');
  return BMI;
}

function BMI_determ(BMI) {
  if (BMI < 18.5) {
    return '過輕';    
  } else if (18.5 <= BMI && BMI <= 25) {
    return '理想';
  } else if (25 < BMI && BMI <= 30) {
    return '過重';
  } else if (30 < BMI && BMI <= 35) {
    return '輕度肥胖';
  } else if (35 < BMI && BMI <= 40) {
    return '中度肥胖';
  } else {
    return '嚴重肥胖';
  }
}

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

function clearData() {
  BMI_Data = [];
  const str = JSON.stringify(BMI_Data);
  localStorage.setItem('BMI-data', str);
  
  // render function
  renderContent();
}

// render function
function renderContent() {
  const table = document.querySelector('.js_result');
  let str = '';
  for (let i = 0; i < BMI_Data.length; i++) {
    str += `<tr><td>${BMI_Data[i].determ}</td><td><span class="small">BMI</span> ${BMI_Data[i].BMI}</td><td><span class="small">weight</span>${BMI_Data[i].weight}kg</td><td><span class="small">height</span>${BMI_Data[i].height}cm</td><td><span class="small">${BMI_Data[i].date}</span></td></tr>`;
  }

  table.innerHTML = str;
}

