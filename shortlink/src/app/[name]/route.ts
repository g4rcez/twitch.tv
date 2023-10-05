import {NextResponse} from "next/server";
import {Shortlink} from "~/database/shortlink";

type Params = { params: { name: string } }

export const GET = async (_: Request, context: Params) => {
    const result = await Shortlink.get(context.params.name);
    if (result === null) {
        return NextResponse.error();
    }
    return NextResponse.redirect(result.data.url)
}
