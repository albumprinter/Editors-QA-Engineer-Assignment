import { test as base } from "@playwright/test";

//TODO create an encapsulated interface and store bellow values in Enum here
export type TestEnvironment = "test" | "acceptance" | "production";
export type Channel = "bonusprint.co.uk";
export type ArticleType = "HardCoverPhotoBook";
export type TestConfig = {
  testEnvironment: TestEnvironment;
  getInstantEditorUrl: (channel: Channel, articleType: ArticleType, papId: string) => string;
};

export const testEnvironment: TestEnvironment = getAndValidateEnvironment(process.env.TEST_ENV);

export const test = base.extend<TestConfig>({
  testEnvironment: testEnvironment,
  getInstantEditorUrl: async ({ testEnvironment }, use) => {
    await use(getInstantEditorUrl.bind(this, testEnvironment));
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
      return "test";
    case "test":
    case "acceptance":
    case "production":
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
    case "test":
      url.hostname = `t-dtap.editor.${channel}`;
      url.pathname = `/instant` + url.pathname;
      break;
    case "acceptance":
      url.hostname = `a-dtap.editor.${channel}`;
      url.pathname = `/instant` + url.pathname;
      break;
    case "production":
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
