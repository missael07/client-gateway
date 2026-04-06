import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PRODUCTS_SERVICE_PORT: number;
    PRODUCTS_SERVICE_HOST: string;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_SERVICE_PORT: joi.number().required(),
    PRODUCTS_SERVICE_HOST: joi.string().required()
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const env: EnvVars = value;

export const envConfig: EnvVars = {
    PORT: env.PORT,
    PRODUCTS_SERVICE_PORT: env.PRODUCTS_SERVICE_PORT,
    PRODUCTS_SERVICE_HOST: env.PRODUCTS_SERVICE_HOST
};