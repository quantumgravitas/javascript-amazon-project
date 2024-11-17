import {currencyFormat} from '../../scripts/utils/money.js';

console.log('Test Suite: Format Currency');

console.log('Converting cents into dollars');

if(currencyFormat(2095)==='20.95')
{
  console.log('passed');
}else{
  console.log('failed');
}

console.log('Works with zero');

if(currencyFormat(0)==='0.00')
{
  console.log('passed');
}else{
  console.log('failed');
}

console.log('Rounds up to the nearest Cents');
if(currencyFormat(2000.5)==='20.01')
{
  console.log('passed');
}else{
  console.log('failed');
}

console.log('Rounds up to the nearest Cents');
if(currencyFormat(2000.4)==='20.00')
{
  console.log('passed');
}else{
  console.log('failed');
}