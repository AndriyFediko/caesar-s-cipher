let alphabet = [];
let alphabetBigLetters = [];
for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
}
for (let i = 65; i <= 90; i++) {
    alphabetBigLetters.push(String.fromCharCode(i));
}
function chifer(password, n) {
    let chiferedWord = "";
    for (i = 0; i < password.length; i++) {
        for (j = 0; j < alphabet.length; j++) {
            if (alphabet[j] == password[i]) {
                if (j + n <= alphabet.length) chiferedWord += alphabet[j + n];
                else chiferedWord += alphabet[j + n - alphabet.length];
            } else if (alphabetBigLetters[j] == password[i]) {
                if (j + n <= alphabetBigLetters.length) chiferedWord += alphabetBigLetters[j + n];
                else chiferedWord += alphabetBigLetters[j + n - alphabetBigLetters.length];
            } else if (alphabet.join("").indexOf(password[i]) == -1 && alphabetBigLetters.join("").indexOf(password[i]) == -1 && j == 0){
                chiferedWord += password[i];
            }
        }
    }
    return chiferedWord;
}
function deChifer(password, n = 3) {
    let deChiferedWord = "";
    for (i = 0; i < password.length; i++) {
        for (j = 0; j < alphabet.length; j++) {
            if (alphabet[j] == password[i]) {
                if (j - n >= 0) deChiferedWord += alphabet[j - n];
                else deChiferedWord += alphabet[j - n + alphabet.length];
            } else if (alphabetBigLetters[j] == password[i]) {
                if (j - n >= 0) deChiferedWord += alphabetBigLetters[j - n];
                else deChiferedWord += alphabetBigLetters[j - n + alphabetBigLetters.length];
            }  else if (alphabet.join("").indexOf(password[i]) == -1 && alphabetBigLetters.join("").indexOf(password[i]) == -1 && j == 0){
                deChiferedWord += password[i];
            }
        }
    }
    return deChiferedWord;
}
$(".mask").hide(0);
$("#chiferBtn").click(function () {
    $("#resultInp").val(chifer($("#startInp").val(), Number($("#select").val())));
});
$("#deChiferBtn").click(function () {
    $("#resultInp").val(deChifer($("#startInp").val(), Number($("#select").val())));
});
$("#clean").click(function () {
    $("input").val("");
});
let usersArr = JSON.parse(localStorage.getItem("users")) || [];
$("#signUpBtn").click(function () {
    if ($("#loginInp").val() != "" && $("#passwordInp").val() != "") {
        $(".logScreen input").css("border", "2px solid rgb(75, 75, 255)");
        alert("Welcome" + " " + $("#loginInp").val());
        usersArr.push({
            login: chifer($("#loginInp").val(), 3),
            password: chifer($("#passwordInp").val(), 3)
        });
        $("#loginInp").val("");
        $("#passwordInp").val("");
        localStorage.users = JSON.stringify(usersArr);
        $(".mask").hide(300);
    }
});
$("#signInBtn").click( function(){
    if($("#loginInp").val() != "" && $("#passwordInp").val() != ""){
        let canditate = {
            login: $("#loginInp").val(),
            password: $("#passwordInp").val()
        }
        let enter = false;
        for(let user of usersArr){
            if(canditate.login == deChifer(user.login, 3) && canditate.password == deChifer(user.password, 3)){
                enter = true;
            } else enter = false;
        }
        if(enter == true && canditate.login != "admin" || canditate.password != "1234"){
            alert("hello" + " " + canditate.login);
            $(".mask").hide(300);
            $("#loginInp").val("");
            $("#passwordInp").val("");
            $(".logScreen input").css("border", "2px solid rgb(75, 75, 255)");
        } else if (enter == true && canditate.login == "admin" && canditate.password == "1234"){
            alert("hello boss");
            $(".mask").hide(300);
            $("#loginInp").val("");
            $("#passwordInp").val("");
            $(".logScreen input").css("border", "2px solid rgb(75, 75, 255)");
        }else{
            $(".logScreen input").css("border", "2px solid rgb(256, 0, 0)");
        }
    }
});
$("#close").click( function(){
    $(".mask").hide(300);
});
$(".signInSpan").click( function(){
    $(".mask").show(300);
});