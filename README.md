# The assignment QA Engineer

Once you receive this test by e-mail please fork this repository to your own GitHub account.

The assignment consists of two parts.

## Part 1: Test planning

We would like you to make a small document describing the test plan for the [online editor](https://t-dtap.editor.bonusprint.co.uk/instant/index.html?articleType=hardcoverphotobook&papId=PAP_360).

## Part 2: Test automation

We are using [Playwright](https://playwright.dev/docs/intro) for our end-to-end testing.

This repository provides you with a setup for running tests and generating a test report.

It has sample code to open the [editor](https://t-dtap.editor.bonusprint.co.uk/instant/index.html?articleType=hardcoverphotobook&papId=PAP_360) and upload some photos in _test/photobook.spec.ts_ file.

What to automate, we will leave that up to you :) Please cover the scenarios that you consider critical for this application.

### System requirements

In order to build the project you will need [Node.js](https://nodejs.org/en/).

In the root of this repository, you can resolve all these dependencies via
the command line using:

    yarn install

You can now run the sample test in headless mode by typing:

    yarn test

To see the report please run:

    yarn report


**We wish you success with your test!**

Test plan for the [online editor](https://t-dtap.editor.bonusprint.co.uk/instant/index.html?articleType=hardcoverphotobook&papId=PAP_360):

Test plan: [Photo book editor Test Plan v.1.0.0](https://epam-my.sharepoint.com/:w:/p/vadym_nastoiashchyi/EYAv5te_SOpKjokAti2R8-8B1FzChJy2Kq7l9_pDvUr9QQ?e=u0K9he).