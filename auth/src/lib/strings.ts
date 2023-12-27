import { uuidv7 } from "@kripod/uuidv7";

export namespace Strings {
    export const trim = (str: string) => str.trim().normalize("NFKC").replace(/\s+/g, " ").replace(/\r+/g, "").replace(/\n+/g, "");
    export const uuid = () => uuidv7();
}
