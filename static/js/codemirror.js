import { CodeJar } from "codejar"

// Custom highlighter for THP, based on regex for now.
// It'll implement a lexer & parser in the future.
const thpHighlighter = (editor, pos) => {
    let code = editor.textContent;

    // Highlighting rules

    // Identifier regex
    const identifier = /[a-z][a-z0-9_]*/g;

    // Datatype regex
    const datatype = /[A-Z][a-z0-9_]*/g;

    

    // example
    code = code.replace(
        /\((\w+?)(\b)/g,
        '(<font color="#8a2be2">$1</font>$2'
    );
    editor.innerHTML = code;

    console.log("running highlighter...", pos);
    code = code.replace(
        /\((\w+?)(\b)/g,
        '(<font color="#8a2be2">$1</font>$2'
    );
    editor.innerHTML = code;
};

let jar = CodeJar(document.getElementById("editor"), thpHighlighter, {
    tab: "    ",
});

jar.updateCode(
    `// Actual generics & sum types
fun find_person(Int person_id) -> Result[String, String] {
    // Easy, explicit error bubbling
    try Person::find_by_id(person_id)
}

val id = POST::get("person_id") ?? exit("Null person_id")
// Errors as values
val person = try find_person(person_id: id) with error {
    eprint("Error: {error}")
    exit("Person not found")
}

// First class HTML-like templates & components
print(
    <a href="/person/reports/{person.id}">
        welcome, {person.name}
    </a>
)
// And more!`
)
