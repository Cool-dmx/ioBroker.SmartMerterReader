import { TemplateFunction } from "../src/lib/createAdapter";

const templateFunction: TemplateFunction = answers => {

	const useTravis = answers.ci === "travis";
	if (!useTravis) return;

	const isAdapter = answers.features.indexOf("adapter") > -1;

	const template = `
os:
  - linux
  - osx
  - windows

language: node_js
node_js:
  - '10'
  - '12'
  - '14'

env:
  - CXX=g++-6
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - g++-6

before_install:
  - 'if [[ "$TRAVIS_OS_NAME" == "osx" ]]; then CC=gcc-6; fi'
  - 'if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then CC=g++-6; fi'
before_script:
  - export NPMVERSION=$(echo "$($(which npm) -v)"|cut -c1)
  - 'if [[ $NPMVERSION == 5 ]]; then npm install -g npm; fi'
  - npm -v
script:
  - npm run test:package
${isAdapter ? `  - npm run test:unit
  - export DEBUG=testing:*
  - npm run test:integration
` : ""}`;
	return template.trimLeft();
};

templateFunction.customPath = ".travis.yml";
// .travis.yml is always formatted with 2 spaces
templateFunction.noReformat = true;
export = templateFunction;
