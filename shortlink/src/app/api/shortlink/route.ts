import {NextResponse} from "next/server";
import {Shortlink} from "~/database/shortlink";
import {schema} from "~/services/validation";

export async function POST(request: Request) {
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, {status: 400});
    }
    const result = await Shortlink.create(validation.data.name, validation.data.url);
    return NextResponse.json(result);
}