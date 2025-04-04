package com.xmflsct.android.languageDetection

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.Arguments

import com.google.mlkit.nl.languageid.LanguageIdentification

class RNLanguageDetectionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "RNLanguageDetectionModule"

    @ReactMethod fun detection(original: String, promise: Promise) {
        try {
            val languageIdentifier = LanguageIdentification.getClient()
            languageIdentifier.identifyPossibleLanguages(original)
                .addOnSuccessListener { possibleLanguages ->
                    var languages = Arguments.createArray()
                    for (possibleLanguage in possibleLanguages) {
                        var language = Arguments.createMap()
                        language.putString("language", possibleLanguage.languageTag)
                        language.putDouble("confidence", possibleLanguage.confidence.toDouble())
                        languages.pushMap(language)
                    }

                    promise.resolve(languages)
                }
                .addOnFailureListener {
                    promise.reject("Detection failed.")
                }
        } catch (e: Throwable) {
            promise.reject("Detection error.", e)
        }
    }
}
