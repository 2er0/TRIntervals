
export interface Sessions {
    [sessionId: string]: SessionRow[];
}

export interface SessionRow {
    time: number;
    power: number;
}

export interface IntervalRow {
    time: number;
    power: number;
    active: boolean;
}