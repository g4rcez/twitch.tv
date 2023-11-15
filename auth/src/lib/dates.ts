export namespace Dates {
    export const toEpoch = (d: Date) => Math.floor(d.getTime() / 1000);

    export const epochNow = () => toEpoch(new Date());
}
