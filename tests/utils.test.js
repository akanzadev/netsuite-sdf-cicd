/**
 * Unit tests for utils.js helpers.
 * Run with: npm test
 *
 * Uses a synchronous AMD shim: define() captures the factory result
 * before the module file finishes executing, so we call require() after.
 */

// Synchronous AMD shim — must be set before require()
global.define = (_deps, factory) => {
  global.__amdResult = factory();
};

require("../src/FileCabinet/SuiteScripts/basic_sdf_project/utils");
const utils = global.__amdResult;

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

// --- formatDate ---
console.log("\nformatDate");
assert(
  utils.formatDate(new Date("2024-01-05")) === "2024-01-05",
  "formats a valid date",
);
assert(
  utils.formatDate(new Date("2024-12-31")) === "2024-12-31",
  "formats end of year",
);
try {
  utils.formatDate("not-a-date");
  assert(false, "should throw on invalid date");
} catch (e) {
  assert(true, "throws on invalid date");
}

// --- isNonEmptyString ---
console.log("\nisNonEmptyString");
assert(
  utils.isNonEmptyString("hello") === true,
  "returns true for non-empty string",
);
assert(utils.isNonEmptyString("") === false, "returns false for empty string");
assert(
  utils.isNonEmptyString("   ") === false,
  "returns false for whitespace-only string",
);
assert(utils.isNonEmptyString(null) === false, "returns false for null");
assert(utils.isNonEmptyString(123) === false, "returns false for number");

// --- safeParseFloat ---
console.log("\nsafeParseFloat");
assert(utils.safeParseFloat("3.14") === 3.14, "parses float string");
assert(utils.safeParseFloat(42) === 42, "parses number");
assert(utils.safeParseFloat("invalid") === 0, "returns 0 for invalid string");
assert(utils.safeParseFloat(null) === 0, "returns 0 for null");
assert(utils.safeParseFloat(undefined) === 0, "returns 0 for undefined");

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
