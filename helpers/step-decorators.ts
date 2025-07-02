import test from "@playwright/test";

export function step(stepName: string) {
  return function <T>(
    target: (this: T, ...args: any[]) => Promise<any>,
    context: ClassMethodDecoratorContext<T>
  ) {
    return async function (this: T, ...args: any[]): Promise<any> {
      return await test.step(stepName, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
