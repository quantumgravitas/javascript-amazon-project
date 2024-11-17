import {currencyFormat} from '../../scripts/utils/money.js';

describe('Test Suite: Format Currency',()=>{
  it('Converting Cents into dollars',()=>{
    expect(currencyFormat(2095)).toEqual('20.95');
  });

  it('Works with zero',()=>{
    expect(currencyFormat(0)).toEqual('0.00');
  });

  it('Rounds up to the nearest Cents',()=>{
    expect(currencyFormat(2000.5)).toEqual('20.01');
  });

  it('Rounds up to the nearest Cents less than 5',()=>{
    expect(currencyFormat(2000.4)).toEqual('20.00');
  });

  it('Checking for negative cents',()=>{
    expect(currencyFormat(-2300)).toEqual('-23.00');
  })
})