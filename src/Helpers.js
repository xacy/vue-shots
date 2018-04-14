primeFactors = function (number) {
  var factors = [];
  for (var index = 2; index <= number / index; index++) {
    while (number % index == 0) {
      factors.push(index);
      number /= index;
    }
  }
  if (number > 1) {
    factors.push(number);
  }
  return factors;
};
calcMcM = function (numbers){
  var factors = [];
  var multiple = 1;

  for(var index=0;index<numbers.length;index++){
    factors=this.primeFactors(numbers[index]);
    for(var secondIndex=0;secondIndex<factors.length;secondIndex++){
      multiple=multiple*factors[secondIndex];
    }
  }
  for(var index=0;numbers.length;index++){
    this.suma += (1*(multiple/numbers[index]));
  }
  return multiple;
};
calcPercent= function (number, mcm){
  var outcome = 0;
  var numerator = 0;

  numerator=1*(mcm/number);
  outcome=100*numerator;
  outcome=outcome/this.suma;

  return outcome;
};
asignRemainder = function (total, drinkPercent, list) {
  var module = 100 - (parseInt(Math.abs(Math.floor(total))));
  var number = parseInt(Math.abs(Math.floor(total)));
  number-=1;
  for(var index=number;index<100;index++){
    randomNumber=parseInt(Math.floor(Math.random()*((list.length-1)+1)));
    drinkPercent[index]=list[randomNumber].id;
  }
  return drinkPercent;
};
generateRandomDrink = function (drinkList){
  var possibilities = [];
  var percents = [];
  var drinkPercent = [];
  var randomOutcome = 0;
  var bebidaMap = [];

  for(var index=0;index<drinkList.length;index++){
    possibilities.push(drinkList[index].times);
  }
  var mcm = this.calcMcM(possibilities);
  var total = 0;
  for(var index=0;index<possibilities.length;index++){
    var  percent = Math.abs(Math.floor(this.calcPercent(possibilities[index],mcm)));
    percents.push(percent);
    total+=percent;
  }
  if(parseInt(total)>100){
    for(var index=0;index<possibilities.length;index++){
      percents[index]=(99*percents[index])/total;
    }
    total=0;
    for(var index=0;index<possibilities.length;index++){
      //he sacado de aqui el total a 0 porque no lo veía claro
      total+=percents[index];
    }
  }
  var counter=0;
  for(var index=0;index<possibilities.length;index++){
    for(var secInd=0;secInd<Math.abs(parseInt(Math.floor(percents[index])));secInd++){
      drinkPercent[counter]=drinkList[index].id;
      counter++;
    }
  }
  if(total<100){
    drinkPercent = this.asignRemainder(total, drinkPercent, drinkList);
  }
  randomOutcome = parseInt(Math.floor(Math.random()*99));
  for(var index=0;index<drinkList.length;index++){
    bebidaMap.push(drinkList[index].id)
  }
  return drinkList[bebidaMap[drinkPercent[randomOutcome]]];
};
