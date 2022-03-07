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
    "guleisin": "input",
    "guleisgone":"clear",

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

let symbolTable = {};

function compile(rawCode) {
    let chopped = rawCode.split("gulei");
    let output;
    let keys = Object.keys(keywords);
    for (let x = 1; x != chopped.length; x++) {
        for (let y = 0; y != keys.length; y++) {
            let divided = chopped[x].split(" ");
            if (divided[0] == keys[y]) {
                output = output + keywords[keys[y]];
                if (divided[1] != null) {
                    if (divided[1].substring(0, 1) == '"' && divided[1].substring(divided[1].length - 1, divided[1].length) == '"') {
                        console.log("Data type: String");
                    }
                    //CHECK WHETHER ITS INTEGER
                    //else if(divided[1][0].isInteger())
                    //{
                    //    console.log("Data type: Integer OR Float");
                    //}
                    else if (divided[1] == "true" || divided[1] == "TRUE" || divided[1] == "false" || divided[1] == "FALSE") {
                        console.log("Data type: Boolean");
                    }
                    else {
                        //Add variables to symbol table
                        //symbolTable[divided[1]]
                        output = output + " ";
                    }

                    output = output + divided[1];
                }
            }
        }
    }

    output = output.substring(9, output.length);
    console.log(output);
}