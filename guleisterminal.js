function print(printable)
{
    document.getElementById("output").innerHTML = document.getElementById("output").innerHTML + printable;
}

function clear()
{
    document.getElementById("output").innerHTML = "";
}

function input(notificationText)
{
    return window.prompt(notificationText);
}

