// This class contains custom expected conditions for use instead of Protractor.ExpectedConditions
class CustomUntil {
  static waitForCountToBeGreaterOrEqualTo(elements, n) {
    return function waitForCountToBeGreaterOrEqualTo() {
      return elements.count().then(count => count >= n);
    };
  }

  static waitForCountToNotEqual(elements, n) {
    return function waitForCountToNotEqual() {
      return elements.count().then(count => count !== n);
    };
  }

  static waitForAttributeToContain(element, attribute, contains) {
    return function waitForAttributeToContain() {
      return element.getAttribute(attribute).then(attrib => attrib.includes(contains));
    };
  }
}

module.exports = CustomUntil;
