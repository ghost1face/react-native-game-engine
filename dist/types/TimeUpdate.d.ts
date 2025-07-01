export interface TimeUpdate {
    current: number;
    delta: number;
    previous: number | null;
    previousDelta: number | null;
}
