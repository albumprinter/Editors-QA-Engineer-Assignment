import { test as base } from "@playwright/test";

enum EnvTypes  {
  Test = 'test',
  Acceptance = 'acceptance',
  Production = 'production',
}

export type TestEnvironment = EnvTypes;
export type Channel = "bonusprint.co.uk";
export type ArticleType = "HardCoverPhotoBook";
export type TestConfig = {
  testEnvironment: TestEnvironment;
  getInstantEditorUrl: (channel: Channel, articleType: ArticleType, papId: string) => string;
  getLoginRegisterUrl: (path: string) => string;
};

export const testEnvironment: TestEnvironment = getAndValidateEnvironment(process.env.TEST_ENV);

export const test = base.extend<TestConfig>({
  testEnvironment: testEnvironment,
  getInstantEditorUrl: async ({ testEnvironment }, use) => {
    await use(getInstantEditorUrl.bind(this, testEnvironment));
  },
  getLoginRegisterUrl: async ({ testEnvironment }, use) => {
    await use(getLoginRegisterUrl.bind(this, testEnvironment));
  },
});

/**
 * @see: packages/e2e/package.json
 * Example:
 *     npx cross-env TEST_ENV=local playwright test
 * @param option
 * @return option
 */
function getAndValidateEnvironment(option?: string): TestEnvironment {
  option = String(option || "").toLowerCase();
  switch (option) {
    case "":
      return EnvTypes.Test;
    case EnvTypes.Test:
    case EnvTypes.Acceptance:
    case EnvTypes.Production:
      return option as TestEnvironment;
    default:
      throw Error(`Unknown environment: ${option}.`);
  }
}

/**
 * @return {string} href
 */
function getInstantEditorUrl(env: TestEnvironment, channel: Channel, articleType: ArticleType, papId: string): string {
  const url = new URL("http://localhost/index.html");
  switch (env) {
    case EnvTypes.Test:
      url.hostname = `t-dtap.editor.${channel}`;
      url.pathname = `/instant` + url.pathname;
      break;
    case EnvTypes.Acceptance:
      url.hostname = `a-dtap.editor.${channel}`;
      url.pathname = `/instant` + url.pathname;
      break;
    case EnvTypes.Production:
      url.hostname = `editor.${channel}`;
      url.pathname = `/instant` + url.pathname;
      break;
    default:
      throw Error(`Unknown environment: ${env}.`);
  }
  url.searchParams.set("articleType", articleType.toLocaleLowerCase());
  url.searchParams.set("papId", papId.toUpperCase());
  url.searchParams.set("testExecution", "true");
  return url.href;
}

function getLoginRegisterUrl(env: TestEnvironment, path:string):string {
  const url=new URL("http://localhost/index.html");
  switch(env){
    case EnvTypes.Test:
      url.hostname = `t-dtap.login.albelli.com/${path}`
      break;
    default: url.hostname = "t-dtap.login.albelli.com/register"
  }
  return url.href
}
