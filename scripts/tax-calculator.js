

document.querySelector('#calculate').addEventListener('click', calculate);

function calculate() {
    let tax = 0.25;
    let salary = document.querySelector('#salary').value;

    if(/[^0-9]/gi.test(salary)) {
        document.querySelector('#salary').value = '';
        document.querySelector('#salary').setAttribute('placeholder','Invalid entry!');
    }
    document.querySelector('#output').value = tax * salary;
}