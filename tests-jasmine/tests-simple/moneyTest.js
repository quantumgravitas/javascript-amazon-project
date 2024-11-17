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

console.log('Rounds up to the nearest Cents greater than 5');
if(currencyFormat(2000.5)==='20.01')
{
  console.log('passed');
}else{
  console.log('failed');
}

console.log('Rounds up to the nearest Cents less than 5');
if(currencyFormat(2000.4)==='20.00')
{
  console.log('passed');
}else{
  console.log('failed');
}
console.log('Cheking for the negative numbers');
if(currencyFormat(-2300)==='-23.00')
{
  console.log('passed');
}else{
  console.log('failed');
  
}