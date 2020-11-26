export interface Button {
    event?: () => void;
}

export interface OptionButton extends Button {
    text?: string;
}

export type MatrixPosition =
    | "LEFT"
    | "TOP"
    | "RIGHT"
    | "BOTTOM"
    | "LEFT-TOP"
    | "RIGHT-TOP"
    | "LEFT-BOTTOM"
    | "RIGHT-BOTTOM"
    | "CENTER"
    | "ELEGANCE";

export interface FollowElement {
    el: HTMLElement;
    place: MatrixPosition;
}

export interface FollowXY {
    [index: number]: number;
    length: 2;
}

export interface Position {
    follow: MatrixPosition | FollowElement | FollowXY; //默认是center | 智能放置在某个element附近 | 指定在具体位置
    offsetXY?: FollowXY; //相对于自身的偏移量
}

export interface ModalData {
    id: symbol;
    state: boolean;
    type: "ALERT" | "CONFIRM";
    title: string;
    content: string;
    shade?: number | boolean;
    close?: Button | boolean | null;
    cancle?: OptionButton | null;
    confirm?: OptionButton | null;
    position?: Position | null;
}