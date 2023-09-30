/**
 * This is simple file that will run the env-deploy.ts with a patched
 * Stack that will generate a snapshot file for every single stack that gets called.
 *
 * The file will fail if there are additional untested files that were generated
 */

import { Construct } from "constructs";
import { main } from "../../bin/deploy";
import * as fs from "fs";
import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { createStackSnapshotTest, getStackSnapshotFileName } from "../test-utils";

// eslint-disable-next-line no-var
var uncreatedTests: string[] = [];
jest.mock("aws-cdk-lib", () => {
  const actual = jest.requireActual("aws-cdk-lib") as typeof cdk;
  const Stack = actual.Stack;
  const { existsSync } = jest.requireActual("fs") as typeof fs;
  const { resolve } = jest.requireActual("path") as typeof path;
  // Resolve the number a file name
  const makeTestIfMissing = (stackName: string) => {
    const testLocation = resolve(__dirname, getStackSnapshotFileName(stackName))
    if (!existsSync(testLocation)) {
      uncreatedTests.push(testLocation)
      createStackSnapshotTest(stackName, testLocation)
    }
  };

  class PatchedStack extends Stack {
    constructor(scope: Construct, id: string, ...otherArgs: any) {
      makeTestIfMissing(id);
      super(scope, id, ...otherArgs);
    }
  }

  // actual.Stack = PatchedStack
  const proxy = new Proxy(actual, {
    get(target, prop, receiver) {
      if (prop === "Stack") {
        return PatchedStack;
      }
      return Reflect.get(target, prop, receiver);
    },
  });
  return proxy;
});

it("has already generated all snapshots for all stacks previously", async () => {
  // Run the whole cdk so our mock works
  // TODO - parameterize this for environments when we make a single deploy folder
  await main();

  expect(uncreatedTests).toEqual([]);
});
