function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  if (expr.includes(" ")) expr = expr.replace(/\s+/g, "");
  let flag = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "(") flag++;
    else if (expr[i] == ")") {
      flag--;
      if (flag < 0) throw "ExpressionError: Brackets must be paired";
    }
  }
  if (flag != 0) throw "ExpressionError: Brackets must be paired";
  function priority(ch) {
    switch (ch) {
      case "(":
      case ")":
        return 0;
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return -1;
    }
  }
  function addPostFix(str) {
    let sp = [];
    let strout = [];
    let n = 0;
    strout.push("");
    let ch;
    for (let i = 0; i < str.length; i++) {
      ch = str[i];
      if (ch >= "0" && ch <= "9") {
        strout[n] += String(ch);
        continue;
      }
      if (!sp.length || ch == "(") {
        sp.push(ch);
        if (strout[n] != "") {
          strout.push("");
          n++;
        }
        continue;
      }
      if (ch == ")") {
        let countSp = sp.length - 1;
        while (sp[countSp] != "(") {
          n++;
          strout.push("");
          strout[n] += String(sp.pop());
          countSp--;
        }
        sp.pop();
        continue;
      }
      let countSp = sp.length - 1;
      let prior = priority(ch);
      while (sp.length && priority(String(sp[countSp])) >= prior) {
        n++;
        strout.push("");
        strout[n] += String(sp.pop());
        countSp--;
      }
      sp.push(ch);
      n++;
      strout.push("");
    }
    while (sp.length) {
      n++;
      strout.push("");
      strout[n] += String(sp.pop());
    }
    return strout;
  }
  function result(str) {
    let sp = [];
    let ch;
    let inf1, inf2, inf;
    for (i = 0; i < str.length; i++) {
      ch = str[i];
      if (!isNaN(Number("+" + ch))) {
        sp.push(Number(ch));
        continue;
      }
      inf2 = sp.pop();
      inf1 = sp.pop();
      switch (ch) {
        case "+":
          sp.push(inf1 + inf2);
          break;
        case "-":
          sp.push(inf1 - inf2);
          break;
        case "*":
          sp.push(inf1 * inf2);
          break;
        case "/":
          if (inf2 == 0) throw "TypeError: Division by zero.";
          sp.push(inf1 / inf2);
          break;
      }
    }
    inf = sp.pop();
    return inf;
  }
  let arr = [];
  arr = addPostFix(expr, arr);
  return result(arr);
}

module.exports = {
  expressionCalculator
};
