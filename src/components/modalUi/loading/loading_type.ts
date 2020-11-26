export type LoadingType =
    | "PLANE"
    | "CHASE"
    | "BOUNCE"
    | "WAVE"
    | "PULSE"
    | "FLOW"
    | "SWING"
    | "CIRCLE"
    | "CIRCLE-FADE"
    | "GRID"
    | "FOLD"
    | "WANDER";

export interface LoadingData {
    state: boolean;
    type: LoadingType;
    speed: number;
    size: number;
    shade: number | boolean;
    color: string;
}
