// Utility class for common workarounds

class JsUtilities {
  // Hover and click for unsupported browsers (EDGE, Safari)
  static hoverAndClickJs(hoverElement, clickElement) {
    return browser.executeScript('if(document.createEvent){'
      + 'var hoverEventObj = document.createEvent(\'MouseEvents\');'
      + 'hoverEventObj.initEvent(\'mouseover\',true,false);'
      + 'arguments[0].dispatchEvent(hoverEventObj);'
      + '}'
      + 'else if(document.createEventObject){'
      + 'arguments[0].fireEvent(\'onmouseover\');'
      + '}arguments[1].click();', hoverElement, clickElement);
  }

  // Force click for faulty elements, when the webdriver .click() doesn't function as intended
  // Examples: element intercepted, element not visible, element not clickable, webdriver error.
  static clickJs(element) {
    return browser.executeScript('arguments[0].click();', element);
  }

  // Force sendKeys for faulty elements, when the webdriver .sendkeys() doesn't function as intended
  // Examples: element not visible, element not user-modifiable, webdriver error.
  static setValueJs(webElement, value) {
    return browser.executeScript(`arguments[0].setAttribute('value’, ‘${value}’);`, webElement);
  }
}

module.exports = JsUtilities;
