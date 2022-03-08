import type { State } from "./State";

/**
 * Fake state store implementation necessary for validating refresh token requests.
 *
 * @internal
 */
export class RefreshState implements State {
    public readonly id = undefined as never;
    public readonly created = undefined as never;
    public readonly request_type = undefined;
    public readonly data: unknown;

    public readonly refresh_token: string;
    public readonly id_token: string;
    public readonly scope: string;
    public readonly extraTokenParams?: Record<string, unknown>;

    constructor(args: {
        refresh_token: string;
        id_token: string;
        scope: string;
        state?: unknown;
        extraTokenParams?: Record<string, unknown>;
    }) {
        this.refresh_token = args.refresh_token;
        this.id_token = args.id_token;
        this.scope = args.scope;
        this.data = args.state;
        this.extraTokenParams = args.extraTokenParams;
    }

    public toStorageString(): string {
        throw new Error("This method was called in error - refresh requests do not store persistent state.");
    }
}
