type SpinKitType =
    | "PLANE"
    | "CHASE"
    | "BOUNCE"
    | "WAVE"
    | "PULS"
    | "FLOW"
    | "SWING"
    | "CIRCLE"
    | "CIRCLE-FADE"
    | "GRID"
    | "FOLD"
    | "WANDER";

const str:any = "";

interface O {
    a:string
}
const obj:O = {a:""}
console.log(obj as O);
// str instanceof SpinKitType