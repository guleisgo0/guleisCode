let keywords = {
    "ntervention": "function",
    "sholder": "let",
    "sjudgement": "if",
    "snotsure": "else",
    "sgiving": "return",
    "sfor": "for",
    "sagain": "while",
    "sdone": "break",
    "skip": "continue",
    "guleisout": "print",
    "sin": "input",
    "sgone": "clear",
    "sref": "reference",

    "s": "=",
    "snt": "!",
    "slacket": "(",
    "sclacket": "{",
    "scracket": "}",
    "sracket": ")",
    "sqlacket": "[",
    "sqracket": "]",
    "superior": ">",
    "sinferior": "<",
    "speriod": ";",
    "salternative": ",",
    "sadd": "+",
    "sub": "-",
    "sdiv": "/",
    "star": "*"
};

let lineNum = 0;
let symbolTable = {};

function compile(rawCode) {
    lineNum = 0;
    let chopped = rawCode.split("gulei");
    let output;
    let keys = Object.keys(keywords);
    for (let x = 1; x != chopped.length; x++) {
        for (let y = 0; y != keys.length; y++) {
            let divided = chopped[x].split(" ");
            if (divided[0] == keys[y] || ((divided[0].substring(divided[0].length - 1, divided[0].length) == "\n") && (divided[0].substring(0, divided[0].length - 1) == keys[y]))) {
                if (keywords[keys[y]] != "reference") {
                    output = output + keywords[keys[y]];
                }
                if (keywords[keys[y]] == "let") {
                    symbolTable[divided[1]] = null;
                }
                if (divided[1] != null) {
                    getDataType(divided[1]);
                    output = output + " " + divided[1];
                }
                if (divided[0].substring(divided[0].length - 1, divided[0].length) == "\n") {
                    lineNum = lineNum + 1;
                    output = output + "\n";
                }
            }
        }
    }

    output = output.substring(9, output.length);
    console.log(output);
}

function isNum(val) {
    return !isNaN(val)
}

function errorThrow(error) {
    lineNum = lineNum + 1;
    var lineAt = "|| LINE: " + lineNum;
    if (error == 1) {
        console.log("Unrecognised characters: Data type cannot be inferred.", lineAt);
    }
    if (error == 2) {
        console.log('Syntax Error: Closing speech mark expected', lineAt);
    }
}

function getDataType(value) {
    if (value.substring(0, 1) == '"' && value.substring(value.length - 1, value.length) == '"') {
        console.log("Data type: String");
    }
    else if ((value.substring(0, 1) == '"' && value.substring(value.length - 1, value.length) != '"') || (value.substring(0, 1) != '"' && value.substring(value.length - 1, value.length) == '"')) {
        errorThrow(2);
        return "error";
    }
    else if (isNum(value[0])) {
        let isFloat = 0;
        let isInvalid = false;
        for (let z = 0; z != value.length; z++) {
            if (isFloat > 1) {
                isInvalid = true;
                break;
            }
            if (isNaN(value[z]) && value[z] == ".") {
                isFloat = isFloat + 1;
            }
            else if (isNaN(value[z])) {
                isInvalid = true;
                break;
            }

        }
        if (isFloat == 1) {
            console.log("Data type: Float");
        }
        else if (isFloat == 0 && !isInvalid) {
            console.log("Data type: Integer");
        }
        else if (isInvalid) {
            errorThrow(1);
            return "error";
        }

    }
    else if (value == "true" || value == "TRUE" || value == "false" || value == "FALSE") {
        console.log("Data type: Boolean");
    }
    else {
        console.log("Identifier");
        return null;
    }
}