// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

import { Logger, JwtUtils } from "./utils";
import { JsonService } from "./JsonService";
import type { MetadataService } from "./MetadataService";
import type { JwtClaims } from "./Claims";

/**
 * @internal
 */
export class UserInfoService {
    protected readonly _logger = new Logger("UserInfoService");
    private readonly _jsonService: JsonService;

    public constructor(private readonly _metadataService: MetadataService) {
        this._jsonService = new JsonService(undefined, this._getClaimsFromJwt);
    }

    public async getClaims(token: string): Promise<JwtClaims> {
        const logger = this._logger.create("getClaims");
        if (!token) {
            this._logger.error("getClaims: No token passed");
            throw new Error("A token is required");
        }

        const url = await this._metadataService.getUserInfoEndpoint();
        logger.debug("got userinfo url", url);

        const claims = await this._jsonService.getJson(url, { token });
        logger.debug("got claims", claims);

        return claims;
    }

    protected _getClaimsFromJwt = async (responseText: string): Promise<JwtClaims> => {
        const logger = this._logger.create("_getClaimsFromJwt");
        try {
            const payload = JwtUtils.decode(responseText);
            logger.debug("JWT decoding successful");

            return payload;
        }
        catch (err) {
            logger.error("Error parsing JWT response");
            throw err;
        }
    };
}
