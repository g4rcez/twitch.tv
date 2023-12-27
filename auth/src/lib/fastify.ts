import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";

type Endpoint = (request: FastifyRequest, response: FastifyReply) => Promise<any>;

const defaultConfig: RouteShorthandOptions = {};
export const createEndpoint = <Fn extends Endpoint, Config extends RouteShorthandOptions = {}>(fn: Fn, config?: Config) =>
    [config ?? defaultConfig, fn] as const;
