//
//  RNLanguageDetectionModule.swift
//  RNLanguageDetectionModule
//
//  Copyright © 2022 xmflsct. All rights reserved.
//

import NaturalLanguage

@objc(RNLanguageDetectionModule)
class RNLanguageDetectionModule: NSObject {
  @objc
  func detection(_ original: String, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    let languageRecognizer = NLLanguageRecognizer()
    languageRecognizer.processString(original)

    let detected = languageRecognizer.languageHypotheses(withMaximum: 1)

    let result: NSMutableArray = []
    for item in detected {
      let temp: NSMutableDictionary = [:]
      temp["language"] = item.key
      temp["confidence"] = item.value
      result.add(temp)
    }
    resolve(result)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
