const { replace } = require('esbuild-plugin-replace');

/**
 * Plugin configuration for esbuild.
 * The secrets (nonce salt and issuer private key) are baked
 * into the deployment at build time using the esbuild-replace
 * plugin.
 *
 * This plugin replaces the process.env expressions as environment
 * variables are not supported by lambda@edge.
 *
 * Note - the plugin is used for both the CF and non-CF versions
 * of the lambda to avoid having two build processes,
 * but the code itself is unchanged, so if the plugin is removed,
 * the deployment will fall back to using the env vars as normal.
 */
module.exports = (serverless) => {
    const environment = serverless.variables.service.provider.environment;
    const { secrets, stage } = serverless.variables.service.custom;
    const fromSecrets = (key) => secrets[stage]?.[key] ?? secrets.default[key];

    const nonceSalt = fromSecrets('NONCE_SALT')
    const issuerPrivateKey = fromSecrets('ISSUER_PRIVATE_KEY_BASE58')

    const environmentConversions = Object.keys(environment).reduce((acc, key) => ({
        ...acc,
        [`process.env.${key}`]: `"${environment[key]}"`
    }), {});

    const replacePluginConfig = {
        "process.env.NONCE_SALT": `"${nonceSalt}"`,
        "process.env.ISSUER_PRIVATE_KEY_BASE58": `"${issuerPrivateKey}"`,
        ...environmentConversions
    };
    const replacePlugin = replace(replacePluginConfig);

    return [replacePlugin];
};