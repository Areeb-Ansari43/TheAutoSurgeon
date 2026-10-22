import { describe, expect, it } from "vitest";
import { pageHead } from "./pageHead";
import { getPageMeta, pageRouteManifest, publicPaths } from "../shared/routes";
import { formError } from "../client/src/lib/formErrors";

describe("public page metadata", () => {
  it("gives service pages their own title and description", () => {
    expect(getPageMeta("/services/wheel-alignment")?.title).toContain(
      "Wheel Alignment in Hayes"
    );
    expect(pageHead("/services/wheel-alignment")).toContain(
      "Wheel Alignment in Hayes"
    );
    expect(pageHead("/pricing")).toContain("Honest Labour Price List");
  });
  it("identifies missing and private pages without inventing a public origin", () => {
    expect(getPageMeta("/missing-page")).toBeUndefined();
    expect(pageHead("/missing-page")).toContain("Page Not Found");
    expect(pageHead("/account")).toContain("noindex, nofollow");
    expect(publicPaths).not.toContain("/manage");
    expect(pageRouteManifest.routes).toHaveLength(21);
  });
});
describe("form error messages", () => {
  it("does not present serialized validation issues to customers", () => {
    expect(
      formError(
        new Error('[{"message":"Preferred time has already passed today."}]')
      )
    ).toBe("Preferred time has already passed today.");
  });
  it("provides a clear network fallback", () => {
    expect(formError(new Error("Failed to fetch"))).toContain(
      "Check your connection"
    );
    expect(formError(undefined)).toContain("Please try again");
  });
});
