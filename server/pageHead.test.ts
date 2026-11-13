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
    expect(pageHead("/account")).toContain("noindex, follow");
    expect(pageHead("/missing-page")).not.toContain('rel="canonical"');
    expect(publicPaths).not.toContain("/manage");
    expect(pageRouteManifest.routes).toHaveLength(22);
  });
  it("gives guides a unique title, canonical URL and article schema", () => {
    const head = pageHead("/guides/tyre-safety-checks");
    expect(head).toContain(
      "<title>Simple Tyre Safety Checks for Everyday Driving in Hayes</title>"
    );
    expect(head).toContain(
      '<link rel="canonical" href="https://theautosurgeon.co.uk/guides/tyre-safety-checks" />'
    );
    expect(head).toContain('"@type":"Article"');
    expect(head).toContain('"@type":"HowTo"');
    expect(head).toContain('property="og:type" content="article"');
  });
  it("points the legacy WhatsApp URL at the real page and keeps it out of the sitemap", () => {
    expect(pageHead("/whatspp")).toContain(
      'href="https://theautosurgeon.co.uk/whatsapp"'
    );
    expect(publicPaths).not.toContain("/whatspp");
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
  it("handles an empty JSON response from a static deployment", () => {
    expect(
      formError(new SyntaxError("Unexpected end of JSON input"))
    ).toContain("admin@theautosurgeon.co.uk");
  });
});
