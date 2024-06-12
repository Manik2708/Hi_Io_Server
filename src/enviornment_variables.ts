export const IfRunningOnDocker = process.env.RUNNING_ON_DOCKER!;
export const RedisUrl: string|undefined = IfRunningOnDocker == 'true' ? 'redis://client:6379': undefined;