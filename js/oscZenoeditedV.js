var strVNaN = "NaN";
var strVInf = "Infinity";
var oscError; "ERROR";
var strMathError = "Math Error";
var strVEmpty = 0;
// input string length limit
var maxLength = 8;
var opCodeArrayV = [];
var stackArrayV = [];
var trigDisplay = "";
var openArray = [];
var stackVal1V = 1;
var stackVal2V = 0;
// ****** GLOBAL VAR *********************************************************
// operationV code
var opCodeV = 0;
// stack memoryV register
var stackValV = 0;
// user memoryV register
var memVal = 0;
// flag to clear input box on data pre-entry
var boolClear = true;

var newopCodeV = 0;
var modeSelected = "deg";
var displaystringV = "";
var memoryV=0;
var trig=0;
var display="";
var afterdec="";
var dS="";
var index;
// ***********************************************************************************

// ******* MAIN **************************************************************
$(document).ready(function () {
    $('.keyPadV_TextBox1V').focus(function(){
        this.blur();
    });
    $('.keyPadV_TextBoxV').focus(function(){
        this.blur();
    });

    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };

    $("[class^=keyPadV_]").each(function(){
        $(this).click(function(){
            $('#keyPadV_UserInput1V').setCursorPosition($('#keyPadV_UserInput1V').val().length);
        });
    });

    var inBoxV = $('#keyPadV_UserInputV');
    var inBox1V = $('#keyPadV_UserInput1V');
    var modeSelected = $('input[name=degree_or_radian]:radio:checked').val();
    $("#keyPadV_UserInputV").val(strVEmpty);

    $('#keyPadV_btnDegRad').click(
    function ()
    {
        console.log("DEG/RAD Button Clicked");
        var elem = document.getElementById("keyPadV_btnDegRad");
        console.log("Current Text = "+ elem.innerHTML);
        if (elem.innerHTML=="deg")
        {
            console.log("DEG --> RAD initialize...");
            elem.innerHTML = "rad"; modeSelected = "deg"
            console.log("DEG --> RAD done!");

        }
        else if (elem.innerHTML=="rad")
            {
                console.log("RAD --> DEG initialize...");
                elem.innerHTML = "deg"; modeSelected="rad"
                console.log("RAD --> DEG done!");

            }
    });

    // ON LOAD ********************************************

    //************************************************************************
    // DATA ENTRY: NUMERIC KEYS

    $("div#keyPadV .keyPadV_btnNumeric").click(function () {
        var btnValV = $(this).html();
        var inBoxV = $('#keyPadV_UserInputV');
        var inBox1V = $('#keyPadV_UserInput1V');
        if(inBoxV.val().indexOf("Infinity")>-1 || inBoxV.val().indexOf(strMathError)>-1) return ;
        // clear input box if flag set
        if (boolClear) { inBoxV.val(strVEmpty); boolClear = false; }
        var strV = inBoxV.val();

        // limit the input length
        if (strV.length > maxLength) return;

        // prevent duplicate dot entry
        if (this.id == "keyPadV_btnDot" && strV.indexOf('.') >= 0 && inBox1V.val()!="")
        {
            inBoxV.val(strVEmpty+".");
            inBox1V.val("");
            return;
        }
        else if( this.id == "keyPadV_btnDot" && strV.indexOf('.') >= 0)
            return;
        displayCheck();
        if(strV != strVEmpty ||strV.length > 1|| this.id == "keyPadV_btnDot"){
            inBoxV.val(strV + btnValV);
            stackVal1V = 1;
        }else{
            inBoxV.val(btnValV);
            stackVal1V = 1;
        }
        inBoxV.focus();
        //if(stackVal2V) { stackVal2V = 4;}
        //inBox1V.val(displaystringV + inBoxV.val());
    });

    // CONST DATA ENTRY *******************************************************
    $(".keyPadV_btnConst").click(function () {
        var retValV = strVEmpty;
        var inputBox = $('#keyPadV_UserInputV');
        var inBox1V = $('#keyPadV_UserInput1V');
        if(inBoxV.val().indexOf("Infinity")>-1 || inBoxV.val().indexOf(strMathError)>-1) return ;
        switch (this.id) {
            // PI
            case 'keyPadV_btnPi': retValV = Math.PI; break;
            // PI/2
            case 'keyPadV_btnPiDiv2': retValV = Math.PI / 2; break;
            // PI/3
            case 'keyPadV_btnPiDiv3': retValV = Math.PI / 3; break;
            // PI/4
            case 'keyPadV_btnPiDiv4': retValV = Math.PI / 4; break;
            // PI/6
            case 'keyPadV_btnPiDiv6': retValV = Math.PI / 6; break;
            // e
            case 'keyPadV_btnE': retValV = Math.E; break;
            // 1/e
            case 'keyPadV_btnInvE': retValV = 1 / Math.E; break;
            // SQRT(2)
            case 'keyPadV_btnSqrt2': retValV = Math.SQRT2; break;
            // SQRT(3)
            case 'keyPadV_btnSqrt3': retValV = Math.sqrt(3); break;
            // CUBE ROOT OF(3)
            case 'keyPadV_btnCubeRoot2': retValV = Math.pow(2, 1 / 3); break;
            // Ln(10)
            case 'keyPadV_btnLn10': retValV = Math.LN10; break;
            // base10: Log(e)
            case 'keyPadV_btnLgE': retValV = Math.LOG10E; break;
            // Sigmas: defects probability: on scale 0...1
            // 1 Sigma
            case 'keyPadV_btnSigma': retValV = 0.69; break;
            // 3 Sigma
            case 'keyPadV_btnSigma3': retValV = 0.007; break;
            // 6 Sigma
            case 'keyPadV_btnSigma6': retValV = 3.4 * Math.pow(10, -6); break;
            default: break;
        }
        displayCheck();
        stackVal1V = 1;
        boolClear = true;

        if(retValV != strVEmpty){
            $('#keyPadV_UserInputV').val(retValV);
            //inBox1V.val(inBox1VRead + " " + retValV);
        }else{
            $('#keyPadV_UserInputV').val(retValV);
            //inBox1V.val(inBox1VRead + " " + retValV);
        }
        inputBox.focus();
    });
    // BINARY operationV KEY ***************************************************
    $("div#keyPadV .keyPadV_btnBinaryOp").click(function () {
        if(inBoxV.val().indexOf("Infinity")>-1 || inBoxV.val().indexOf(strMathError)>-1) return ;
        switch (this.id) {
            case 'keyPadV_btnPlus': stackCheckV($("#"+this.id).text());
                newopCodeV = 1;
                if(opCodeV == 10 && stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" )
                    opCodeChangeV();
                operationV();
                stackVal1V = 0;
                break;
            case 'keyPadV_btnMinus': stackCheckV($("#"+this.id).text());
                newopCodeV = 2;
                if(opCodeV == 10 && stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" )
                    opCodeChangeV();
                operationV();
                stackVal1V = 0;
                break;
            case 'keyPadV_btnMult':stackCheckV($("#"+this.id).text());
                newopCodeV = 3; if(opCodeV ==1 || opCodeV == 2){
                opCodeChangeV();
            }
                if(opCodeV == 10)
                {
                    if(opCodeArrayV[opCodeArrayV.length - 1] < 3 || (stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" ))
                    {
                        opCodeChangeV();
                    }
                    else
                    {
                        operationV();
                    }
                }
                stackVal1V = 0;
                break;
            case 'keyPadV_btnDiv': stackCheckV($("#"+this.id).text());
                newopCodeV = 4;
                if(opCodeV < 4 && opCodeV){
                    opCodeChangeV();
                }
                if(opCodeV == 10)
                {
                    if(opCodeArrayV[opCodeArrayV.length - 1] < 4 || stackVal1V == 5 || (stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" ))
                    {
                        opCodeChangeV();
                    }
                    else
                    {
                        operationV();
                    }
                }
                stackVal1V = 0;
                break;
            case 'keyPadV_%' :stackCheckV("%");
                newopCodeV=11;if(opCodeV < 6 && opCodeV ){
                opCodeChangeV();
            }
                if(opCodeV == 10)
                {
                    if(opCodeArrayV[opCodeArrayV.length - 1] < 6 || (stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" ))
                    {
                        opCodeChangeV();
                    }
                    else
                    {
                        operationV();
                    }
                }
                stackVal1V = 0;
                break;

            case 'keyPadV_EXP':stackCheckV("e+0");
                newopCodeV=9;if(opCodeV < 6 && opCodeV ){
                opCodeChangeV();
            }
                if(opCodeV == 10)
                {
                    if(opCodeArrayV[opCodeArrayV.length - 1] < 6|| (stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" ))
                    {
                        opCodeChangeV();
                    }
                    else
                    {
                        operationV();
                    }
                }
                stackVal1V = 1;
                stackVal2V = 7;
                break;
            case 'keyPadV_btnYpowX': stackCheckV("^");
                newopCodeV = 6; if(opCodeV < 6 && opCodeV ){
                opCodeChangeV();
            }
                if(opCodeV == 10)
                {
                    if(opCodeArrayV[opCodeArrayV.length - 1] < 6 || (stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" ))
                    {
                        opCodeChangeV();
                    }
                    else
                    {
                        operationV();
                    }
                }
                stackVal1V = 0;
                break;
            case 'keyPadV_btnMod':stackCheckV($("#"+this.id).text());
                newopCodeV = 5;
                if(opCodeV ==1 || opCodeV == 2){
                    opCodeChangeV();
                }
                if(opCodeV == 10)
                {
                    if(opCodeArrayV[opCodeArrayV.length - 1] == 1 || 2 || (stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" ))
                    {
                        opCodeChangeV();
                    }
                    else
                    {
                        operationV();
                    }
                }
                stackVal1V = 0;
                break;//Harsh
            case 'keyPadV_btnYrootX':
                stackCheckV("yroot");
                newopCodeV = 7;
                if(opCodeV < 6 && opCodeV ){
                    opCodeChangeV();
                }
                if(opCodeV == 10)
                {
                    if(opCodeArrayV[opCodeArrayV.length - 1] < 6 || (stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" ))
                    {
                        opCodeChangeV();
                    }
                    else
                    {
                        operationV();
                    }
                }
                stackVal1V = 0;
                break;//Harsh
            case 'keyPadV_btnYlogX': stackCheckV("logxBasey");
                newopCodeV = 8;
                if(opCodeV ==1 || opCodeV == 2){
                    opCodeChangeV();
                }
                if(opCodeV == 10)
                {
                    if(opCodeArrayV[opCodeArrayV.length - 1] < 3|| (stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] == "{" ))
                    {
                        opCodeChangeV();
                    }
                    else
                    {
                        operationV();
                    }
                }
                stackVal1V = 0;
                break; //Harsh
            case 'keyPadV_btnOpen' : displaystringV= inBox1V.val() + $("#"+this.id).text();
                newopCodeV = 0;
                inBoxV.val(0);
                if(opCodeV != 0){
                    opCodeChangeV();}
                openArray.push("{");
                stackArrayV.push("{");
                stackVal1V =1;
                break;
            case 'keyPadV_btnClose' :if(stackVal2V == 6) { stackValV = parseFloat(inBoxV.val());displaystringV = inBox1V.val() + inBoxV.val() + $("#"+this.id).text();}
            else if(newopCodeV !=10){
                if(stackVal1V !=3)
                {
                    if((inBox1V.val().indexOf("e+0")>-1)&&inBoxV.val().indexOf("-")>-1)
                        inBox1V.val(inBox1V.val().replace("e+0","e"));
                    else if((inBox1V.val().indexOf("e+0")>-1))
                        inBox1V.val(inBox1V.val().replace("e+0","e+"));
                    displaystringV= inBox1V.val() + inBoxV.val() + $("#"+this.id).text();
                }
                else
                    displaystringV= inBox1V.val()+ $("#"+this.id).text();
            }
            else {
                displaystringV = inBox1V.val() + $("#"+this.id).text(); }
                if(openArray[0])
                {
                    openArray.pop();
                    newopCodeV = 10;
                    while(opCodeArrayV[0] || openArray[0]){
                        if(stackArrayV[stackArrayV.length - 1] == "{")
                        {
                            stackArrayV.pop();
                            break;
                        }
                        else{
                            oscBinaryoperationV();
                            stackValV = stackArrayV[stackArrayV.length - 1];
                            if(stackValV == "{" )
                            {
                                stackArrayV.pop();
                                opCodeV = 0;
                                break;
                            }
                            stackArrayV.pop();
                            opCodeV = opCodeArrayV[opCodeArrayV.length - 1];
                            opCodeArrayV.pop();
                            if(!opCodeArrayV[0] && stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] != "{") //if length is 0 then below statement gives error...
                            {
                                stackValV = stackArrayV[stackArrayV.length - 1];
                            }
                        }
                    }
                }
                else
                {
                    return;
                }
                stackVal2V =1 ;
                stackVal1V = 5;
                break;
            case 'keyPadV_btnPercent':
                if (opCodeV == 1 || opCodeV == 2)
                { inBoxV.val((stackValV * parseFloat(inBoxV.val()) / 100)); }
                else if (opCodeV == 3 || opCodeV == 4)
                { inBoxV.val((parseFloat(inBoxV.val()) / 100)); }
                else return;
                break;
            default: break;
        }
        if (opCodeV) { oscBinaryoperationV();}
        else { stackValV = parseFloat(inBoxV.val()); boolClear = true; }
        opCodeV = newopCodeV;
        inBoxV.focus();
        inBox1V.val(displaystringV);
    });

    // memory operationVS *******************************************************
    $(".keyPadV_btnMemoryOp").click(function () {
        var inputBox = $('#keyPadV_UserInputV');
        var x = parseFloat(inputBox.val());
        if((inputBox.val())=="")
        {
            x=0;
        }
        var retValV =0;
        if(inBoxV.val().indexOf("Infinity")>-1 || inBoxV.val().indexOf(strMathError)>-1) return ;
        switch (this.id) {
            case 'keyPadV_MS':memoryV=x;
            document.getElementById("keyPadV_MS").style.background = "rgba(8,82,127,0.69)";
            document.getElementById("keyPadV_MS").style.borderColor = "#082d55";
            document.getElementById("keyPadV_MS").style.color = "#fff";
            retValV=inBoxV.val(); //stackVal1V =2;
                break;
            case 'keyPadV_M+':memoryV=x+parseFloat(memoryV);
                document.getElementById("keyPadV_MS").style.background = "rgba(8,82,127,0.69)";
                document.getElementById("keyPadV_MS").style.borderColor = "#082d55";
                document.getElementById("keyPadV_MS").style.color = "#fff";
            ;retValV=inBoxV.val(); //stackVal1V =2;
                break;
            case 'keyPadV_MR':retValV=parseFloat(memoryV);
                stackVal1V=1;
                break;
            case 'keyPadV_MC':memoryV=0;
                document.getElementById("keyPadV_MS").style.background = "#f1f1f1";
                document.getElementById("keyPadV_MS").style.borderColor = "#aaa";
                document.getElementById("keyPadV_MS").style.color = "#444";
                retValV=inBoxV.val(); //stackVal1V =2;
                break;
            case 'keyPadV_M-': memoryV=parseFloat(memoryV)-x;
                document.getElementById("keyPadV_MS").style.background = "rgba(8,82,127,0.69)";
                document.getElementById("keyPadV_MS").style.borderColor = "#082d55";
                document.getElementById("keyPadV_MS").style.color = "#fff";
                retValV=inBoxV.val();  // stackVal1V =2;
                break;
            default:break;
        }

        if(retValV != strVEmpty){
            $('#keyPadV_UserInputV').val(retValV);
            //inBox1V.val(inBox1V.val() + " " + retValV);
        }else{
            $('#keyPadV_UserInputV').val(retValV);
            //inBox1V.val(inBox1VRead + " " + retValV);
        }
        /* $(keyPadV_UserInputV).val(retValV); */
        //inBox1V.val(inBox1VRead + " " + retValV);
        boolClear = true;
        inputBox.focus();
    });


    function stackCheckV(text)
    {

        if(stackVal1V == 2) {
            inBox1V.val(""); }
        if(stackVal1V == 0) {
            opCodeV = 0;
            var x = 1;
            switch(newopCodeV)
            {
                case 5 : x = 3; break;
                case 7: x = 5; break;
                case 8: x = 9; break;
                default: break;
            }
            if(!(inBox1V.val().indexOf("e+")>-1))
                inBox1V.val(inBox1V.val().substring(0, inBox1V.val().length - x));
            stackVal2V = 2;
        }
        if(stackVal1V == 5 || stackVal2V == 2)
        {stackVal2V = 0;
            displaystringV= inBox1V.val() + text;}
        else{
            if((inBox1V.val().indexOf("e+0")>-1)&&inBoxV.val().indexOf("-")>-1)
                inBox1V.val(inBox1V.val().replace("e+0","e"));
            else if((inBox1V.val().indexOf("e+0")>-1))
                inBox1V.val(inBox1V.val().replace("e+0","e+"));
            displaystringV = inBox1V.val() + inBoxV.val() + text;
        }
    }

    function operationV()
    {
        while(opCodeArrayV[0] && opCodeV){
            if(opCodeV == 10)
            {
                opCodeV = opCodeArrayV[opCodeArrayV.length -1];
                stackValV = stackArrayV[stackArrayV.length - 1];
                if(newopCodeV == 1 || newopCodeV == 2 || newopCodeV <= opCodeV){
                    opCodeArrayV.pop();
                    stackArrayV.pop();
                }
                else{
                    opCodeV = 0;
                    break;
                }
            }
            else if(stackArrayV[stackArrayV.length - 1] == "{")
            {
                break;
            }
            else{
                oscBinaryoperationV();
                stackValV = stackArrayV[stackArrayV.length - 1];
                if(stackValV == "{" )
                {
                    opCodeV = 0;
                    break;
                }
                opCodeV = opCodeArrayV[opCodeArrayV.length - 1];
                if(newopCodeV == 1 || newopCodeV == 2 || newopCodeV <= opCodeV){
                    opCodeArrayV.pop();
                    stackArrayV.pop();
                }
                else{
                    opCodeV = 0;
                    break;
                }
                if(!opCodeArrayV[0] && stackArrayV.length > 0 && stackArrayV[stackArrayV.length-1] != "{") //if length is 0 then below statement gives error...
                {
                    stackValV = stackArrayV[stackArrayV.length - 1];
                }
            }
        }
    }
    function opCodeChangeV()
    {
        if(opCodeV != 10 && opCodeV != 0){
            opCodeArrayV.push(opCodeV);
            stackArrayV.push(stackValV);
        }
        if(opCodeV == 0){
            stackArrayV.push(stackValV);
            // alert(stackValV);
        }
        opCodeV = 0;
    }
    function displayCheck(){
        switch(stackVal1V){
            case 2: inBox1V.val("");break;
            case 3: inBox1V.val(inBox1V.val().substring(0,inBox1V.val().length-trigDisplay.length)); stackVal2V = 4;break;
            case 5:var string = "" ;
                for(var i=openArray.length; i>=0; i--){
                    string = string + displaystringV.substring(0,displaystringV.indexOf("(")+1);
                    displaystringV = displaystringV.replace(string,"");
                }
                displaystringV = string.substring(0,string.lastIndexOf("("));
                inBox1V.val(displaystringV);
                stackVal2V = 6;
                break;
            default: break;
        }
    }

    // BINARY COMPUTATION *****************************************************

    function oscBinaryoperationV() {
        var inBoxV = $('#keyPadV_UserInputV');
        var x2 = parseFloat(inBoxV.val());
        var retValV = 0;
        switch (opCodeV) {
            case 9: stackValV=parseFloat(stackValV)*Math.pow(10,x2); break;
            case 1: stackValV += x2; break;
            case 2: stackValV -= x2;
                break;
            case 3: stackValV *= x2;
                break;
            case 4: stackValV /= x2;
                break;
            // stack power inputBox
            case 6: var precisioncheck=stackValV;
                stackValV = Math.pow(stackValV, x2);
                if(precisioncheck==10&&stackValV%10!=0&&(Math.abs(stackValV)<0.00000001||Math.abs(stackValV)>100000000)&&x2%1==0)
                    stackValV=stackValV.toPrecision(7);
                break;
            case 5: stackValV = stackValV % x2; break;//Harsh
            case 7: stackValV = nthroot(stackValV, x2); break;//Harsh
            case 8: stackValV = Math.log(stackValV)/Math.log(x2); break;//Harsh
            case 11:stackValV=stackValV/100*x2;break;
            case 0: stackValV = x2;
            default: break;
        }
        retValV = stackValV;
        if(Math.abs(retValV)<0.00000001 || Math.abs(retValV)>100000000){
        }
        else
        {
            if(retValV.toFixed(8) % 1 != 0)
            {
                var i = 1;
                while(i<10)
                {
                    if((retValV.toFixed(i) != 0) && (retValV.toFixed(i) / retValV.toFixed(i+8) == 1)){ retValV = retValV.toFixed(i); break;}
                    else{
                        i++;
                    }
                }
            }
            else {retValV = retValV.toFixed(0); }
        }
        inBoxV.val(retValV);
        boolClear = true;
        trig=0;
        inBoxV.focus();
    }
    // UNARY operationVS *******************************************************
    $(".keyPadV_btnUnaryOp").click(function () {
        var inputBox = $('#keyPadV_UserInputV');
        var x = parseFloat(inputBox.val());
        var retValV = oscError;
        if(inBoxV.val().indexOf("Infinity")>-1 || inBoxV.val().indexOf(strMathError)>-1) return ;
        switch (this.id) {
            // +/-
            case 'keyPadV_btnInverseSign': retValV = -x; trig=1;stackVal2V = 3; break;
            // 1/X
            case 'keyPadV_btnInverse': retValV = 1 / x;displayTrignometric("reciproc",x); break;
            // X^2
            case 'keyPadV_btnSquare': retValV = x * x;displayTrignometric("sqr",x); break;
            // SQRT(X)
            case 'keyPadV_btnSquareRoot': retValV = Math.sqrt(x);displayTrignometric("sqrt",x); break;
            // X^3
            case 'keyPadV_btnCube': retValV = x * x * x;displayTrignometric("cube",x); break;
            // POW (X, 1/3)
            case 'keyPadV_btnCubeRoot': retValV = nthroot(x,3);displayTrignometric("cuberoot",x); break;
            // NATURAL LOG
            case 'keyPadV_btnLn': retValV = Math.log(x); displayTrignometric($("#"+this.id).text(),x); break;
            // LOG BASE 10
            case 'keyPadV_btnLg': retValV = Math.log(x) / Math.LN10; displayTrignometric($("#"+this.id).text(),x); break;
            // E^(X)
            case 'keyPadV_btnExp': retValV = Math.exp(x);displayTrignometric("powe",x); break;
            // SIN
            case 'keyPadV_btnSin': retValV = sinCalc(modeSelected,x); modeText($("#"+this.id).text(),x);trig=1;break;
            // COS
            case 'keyPadV_btnCosin': retValV = cosCalc(modeSelected,x);modeText($("#"+this.id).text(),x);trig=1; break;
            // TAN
            case 'keyPadV_btnTg': retValV = tanCalc(modeSelected,x); modeText($("#"+this.id).text(),x);trig=1;break;
            // CTG
            case 'keyPadV_btnCtg': retValV = cotCalc(modeSelected,x);modeText($("#"+this.id).text(),x); break;

            //###### Added By Harsh : Starts #####//

            //Factorial
            case 'keyPadV_btnFact': retValV = factorial(x);displayTrignometric("fact",x); break;

            //10^x
            case 'keyPadV_btn10X': retValV = Math.pow(10, x);
                if(retValV%10!=0&& (Math.abs(retValV)<0.00000001||Math.abs(retValV)>100000000)&&(x%1==0))
                    retValV=retValV.toPrecision(7);
                displayTrignometric("powten",x); break;

            //AsinH
            case 'keyPadV_btnAsinH': retValV = inverseSineH(x);modeText($("#"+this.id).text(),x); break;

            //AcosH
            case 'keyPadV_btnAcosH': retValV = Math.log(x+Math.sqrt(x+1)*Math.sqrt(x-1)); modeText($("#"+this.id).text(),x);break;

            //AtanH
            case 'keyPadV_btnAtanH': retValV = 0.5*(Math.log(1+x)-Math.log(1-x));modeText($("#"+this.id).text(),x); break;

            //Absolute |x|
            case 'keyPadV_btnAbs': retValV = Math.abs(x); displayTrignometric("abs",x); break;

            //Log Base 2
            case 'keyPadV_btnLogBase2': retValV = Math.log(x)/Math.log(2);
                displayTrignometric("logXbase2",x);
                break;

            //###### Added By Harsh : Ends #####//


            // Arcsin
            case 'keyPadV_btnAsin': retValV = sinInvCalc(modeSelected,x);modeText("asin",x);trig=1; break;
            // Arccos
            case 'keyPadV_btnAcos': retValV = cosInvCalc(modeSelected,x); modeText("acos",x);trig=1;break;
            // Arctag
            case 'keyPadV_btnAtan': retValV = tanInvCalc(modeSelected,x);modeText("atan",x); trig=1;break;

            // Secant
            case 'keyPadV_btnSec': retValV = secCalc(modeSelected,x); break;
            // Cosecant
            case 'keyPadV_btnCosec': retValV = cosecCalc(modeSelected,x); break;

            // sinh
            case 'keyPadV_btnSinH':
                retValV = (Math.pow(Math.E, x) - Math.pow(Math.E, -x)) / 2;modeText($("#"+this.id).text(),x); break;
            // cosh
            case 'keyPadV_btnCosinH':
                retValV = (Math.pow(Math.E, x) + Math.pow(Math.E, -x)) / 2; modeText($("#"+this.id).text(),x);break;
            // coth
            case 'keyPadV_btnTgH':
                retValV = (Math.pow(Math.E, x) - Math.pow(Math.E, -x));
                retValV /= (Math.pow(Math.E, x) + Math.pow(Math.E, -x));
                modeText($("#"+this.id).text(),x);
                break;
            // Secant hyperbolic
            case 'keyPadV_btnSecH':
                retValV = 2 / (Math.pow(Math.E, x) + Math.pow(Math.E, -x)); break;
            // Cosecant hyperbolic
            case 'keyPadV_btnCosecH':
                retValV = 2 / (Math.pow(Math.E, x) - Math.pow(Math.E, -x)); ; break;
            // 1+x
            case 'keyPadV_btnOnePlusX': retValV = 1 + x; break;
            // 1-x
            case 'keyPadV_btnOneMinusX': retValV = 1 - x; break;
            default: break;
        }

        if(stackVal2V == 1){
            stackValV = retValV;}
        if(stackVal2V !=3) {stackVal2V = 2;}
        stackVal1V = 3;
        boolClear = true;
        if(retValV == 0 || retValV == strMathError || retValV == strVInf){
            inputBox.val(retValV);
        }else if((Math.abs(retValV)<0.00000001||Math.abs(retValV)>100000000)&&trig!=1){
        }
        else {
            if(retValV.toFixed(8) % 1 != 0)
            {
                var i = 1;
                while(i<10)
                {
                    if((retValV.toFixed(i) != 0) && (retValV.toFixed(i) / retValV.toFixed(i+8) == 1)){ retValV = retValV.toFixed(i); break;}
                    else{
                        i++;
                    }
                }
            }
            else {retValV = retValV.toFixed(0); }
        }
        /* display=retValV+"";
        afterdec=display.substring(display.indexOf("."),display.length);
        if(!(afterdec.indexOf("1")>-1||afterdec.indexOf("2")>-1||afterdec.indexOf("3")>-1||afterdec.indexOf("4")>-1||afterdec.indexOf("5")>-1||afterdec.indexOf("6")>-1||afterdec.indexOf("7")>-1||afterdec.indexOf("8")>-1||afterdec.indexOf("9")>-1)&&!(display.indexOf("NaN")>-1)&&!(display.indexOf("Infinity")>-1))
        {
        display=display.slice(0,display.lastIndexOf("."));
        } */
        if(retValV==-0)
            retValV=0;
        inputBox.val(retValV);
        trig=0;
        inBox1V.val(displaystringV);
        inputBox.focus();
    });

    $("div.degree_radian").click(function () {
        modeSelected = $('input[name=degree_or_radian]:radio:checked').val();
    });

    function inverseSineH(inputVal){
        return Math.log(inputVal+Math.sqrt(inputVal*inputVal+1));
    }
    function modeText(text,x){
        var mode = "d";
        if(modeSelected != "deg") { mode = "r" ; }
        displayTrignometric(text+mode,x);
    }
    function displayTrignometric(text,x)
    {
        if(stackVal2V == 1){
            var string = "" ;
            for(var i=openArray.length; i>=0; i--){
                string = string + displaystringV.substring(0,displaystringV.lastIndexOf("(")+1);
                displaystringV = displaystringV.replace(string,"");
            }
            displaystringV = string.substring(0,string.lastIndexOf("("));
            trigDisplay = text + "(" + x + ")" ;
        }
        if(stackVal2V == 2 || stackVal1V ==3){
            if(stackVal2V ==3) { trigDisplay = text + "(" + x + ")" ; stackVal2V = 2; }
            else{
                displaystringV = displaystringV.replace(trigDisplay,"");
                trigDisplay = text + "(" + trigDisplay + ")" ;} }
        else { if(stackVal2V == 4){displaystringV = "";} trigDisplay = text + "(" + x + ")" ; }
        displaystringV = displaystringV + trigDisplay ;
    }
    function nthroot(x, n) {
        try {
            var negate = n % 2 == 1 && x < 0;
            if(negate)
                x = -x;
            var possible = Math.pow(x, 1 / n);
            n = Math.pow(possible, n);
            if(Math.abs(x - n) < 1 && (x > 0 == n > 0))
                return (negate ? -possible : possible);
            else return (negate ? -possible : possible);
        } catch(e){}
    }

    function changeXBasedOnMode(mode,inputValue){
        if(mode == "deg"){
            return (inputValue * (Math.PI/180));
        }else if(mode == "rad"){
            return inputValue;
        }
    }

    function tanCalc(mode,inputVal){
        var ipVal = changeXBasedOnMode(mode,inputVal);
        if(ipVal%(Math.PI/2)== "0"){
            if((ipVal/(Math.PI/2))%2 == "0"){
                return "0";
            }else{
                return strMathError;
            }
        }else{
            return Math.tan(ipVal);
        }
    }

    function cosCalc(mode,inputVal){
        var ipVal = changeXBasedOnMode(mode,inputVal);
        if(ipVal.toFixed(8)%(Math.PI/2).toFixed(8) == "0"){
            if((ipVal.toFixed(8)/(Math.PI/2)).toFixed(8)%2 == "0"){
                return Math.cos(ipVal);
            }else{
                return "0";
            }
        }else{
            return Math.cos(ipVal);
        }
    }

    function sinCalc(mode,inputVal){
        var ipVal = changeXBasedOnMode(mode,inputVal);
        if((ipVal.toFixed(8)%Math.PI).toFixed(8)== 0){
            return "0";
        }else{
            return Math.sin(ipVal);
        }

    }

    function cotCalc(mode,inputVal){
        var tanVal = tanCalc(mode,inputVal);
        if(tanVal == 0){
            return strMathError;
        }else if(tanVal == strMathError){
            return '0';
        }else{
            return 1/tanVal;
        }
    }

    function secCalc(mode,inputVal){
        var cosVal = cosCalc(mode,inputVal);
        if(cosVal.toFixed(8) == 0){
            return strMathError;
        }else{
            return 1/cosVal;
        }
    }

    function cosecCalc(mode, inputVal){
        var sinVal = sinCalc(mode,inputVal);
        if(sinVal.toFixed(8) == 0){
            return strMathError;
        }else{
            return 1/sinVal;
        }

    }

    function changeValOfInvBasedOnMode(mode, ipVal){
        if(mode == 'deg'){
            return (180/Math.PI)*ipVal;
        }else{
            return ipVal;
        }
    }

    function sinInvCalc(mode,inputVal){
        var opVal;
        var ipVal = Math.asin(inputVal);
        if(strVNaN.indexOf(ipVal.toFixed(8))>-1){
            opVal = strMathError;
        }else{
            opVal = changeValOfInvBasedOnMode(mode, ipVal);
        }
        return opVal;
    }

    function cosInvCalc(mode,inputVal){
        var opVal;
        var ipVal = Math.acos(inputVal);
        if(strVNaN.indexOf(ipVal.toFixed(8))>-1){
            opVal = strMathError;
        }else{
            opVal = changeValOfInvBasedOnMode(mode, ipVal);
        }
        return opVal;
    }

    function tanInvCalc(mode, inputVal){
        var opVal;
        var ipVal = Math.atan(inputVal);
        if(strVNaN.indexOf(ipVal.toFixed(8))>-1){
            opVal = strMathError;
        }else{
            opVal = changeValOfInvBasedOnMode(mode, ipVal);
        }
        return opVal;
    }

    // ************************************************************************
    // COMMAND aS: BACKSPACE, CLEAR AND ALL CLEAR
    $("div#keyPadV .keyPadV_btnCommand").click(function () {
        var inBoxV = $('#keyPadV_UserInputV');
        var inBox1V = $('#keyPadV_UserInput1V');
        var i=0;
        var j=0;
        var strVInput = inBoxV.val();
        switch (this.id) {
            // on enter calculate the result, clear opCodeV
            case 'keyPadV_btnEnter': if(inBoxV.val().indexOf("Infinity")>-1 || inBoxV.val().indexOf(strMathError)>-1) return ;
                while(opCodeV || opCodeArrayV[0]){
                    if(stackArrayV[stackArrayV.length - 1] == "{")
                    {
                        stackArrayV.pop();
                    }
                    oscBinaryoperationV();
                    stackValV = stackArrayV[stackArrayV.length - 1];
                    opCodeV = opCodeArrayV[opCodeArrayV.length - 1];
                    stackArrayV.pop();
                    opCodeArrayV.pop();
                }; opCodeV = 0; inBoxV.focus(); displaystringV = ""; trigDisplay = "";stackValV = strVEmpty;openArray = [];
                if(stackVal1V != 2) {
                    if(stackVal1V == 3 ||stackVal2V == 1) {
                        if(stackVal2V!=3 )strVInput = "";
                    }
                    if(newopCodeV==9){
                        if(strVInput.indexOf("-") > -1)
                        {inBox1V.val(inBox1V.val().substring(0,inBox1V.val().lastIndexOf("+")));
                        }
                        else {
                            inBox1V.val(inBox1V.val().replace("e+0","e+"));
                        }
                    }
                    inBox1V.val(inBox1V.val()+strVInput);
                }
                stackVal1V = 2;
                newopCodeV = 0;
                stackVal2V = 0; stackArrayV = []; opCodeArrayV = [];
                return;
            // clear input box (if not empty) or opCodeV
            case 'keyPadV_btnClr':
                if(inBoxV.val().indexOf("Infinity")>-1 || inBoxV.val().indexOf(strMathError)>-1) return ;
                if (strVInput == strVEmpty) { opCodeV = 0; boolClear = false;
                }
                else { inBoxV.val(strVEmpty);
                }
                break;
            // clear the last char if input box is not empty

            case 'keyPadV_btnBack': if(stackVal1V ==1 || stackVal2V == 3){if (strVInput.length > 1) { if(inBoxV.val().indexOf("Infinity")>-1 || inBoxV.val().indexOf(strMathError)>-1) return ;
                inBoxV.val(strVInput.substring(0, strVInput.length - 1)); if(inBoxV.val() == "-") inBoxV.val("0"); break;
            }else{
                inBoxV.val("0");
                break;
            }}
            else break;
            // clear all
            case 'keyPadV_btnAllClr':
                inBoxV.val(strVEmpty);
                displaystringV = "";
                trigDisplay = "";
                stackArrayV = []; opCodeArrayV = [];openArray = [];
                inBox1V.val("");
                stackValV = strVEmpty;
                stackVal1V = 1;
                stackVal2V = 0;
                newopCodeV = 0;
                opCodeV = 0;
                break;
            default: break;
        }
    });
})
// ***********************************************************************************

//Factorial Function //Harsh
function factorial(n){
    if(n > 170) return strVInf;
    if (n == 1||n==0) return 1;
    else if(n<0)return strMathError;
    else if(n%1!=0) return gamma(n+1);
    else
        return n*factorial(n-1);
}


function gamma(n) {
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (n < 0.5) {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    } else {
        n--;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}