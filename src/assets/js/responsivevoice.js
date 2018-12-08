/*
 ResponsiveVoice JS v1.5.10

 (c) 2015-2018 LearnBrite

 License: http://responsivevoice.org/license
*/
if ("undefined" != typeof responsiveVoice) console.log("ResponsiveVoice already loaded"), console.log(responsiveVoice);
else var ResponsiveVoice = function() {
        var a = this;
        a.version = "1.5.10";
        console.log("ResponsiveVoice r" + a.version);
        a.responsivevoices = [{
            name: "US English Male",
            flag: "us",
            gender: "m",
            lang: "en-US",
            voiceIDs: [234, 282, 338, 236, 284, 340, 237, 382, 2, 4, 0, 6, 7, 75, 159]
        }];
        a.systemvoices = null;
        a.CHARACTER_LIMIT = 100;
        a.VOICESUPPORT_ATTEMPTLIMIT = 5;
        a.voicesupport_attempts = 0;
        a.fallbackMode = !1;
        a.WORDS_PER_MINUTE = 130;
        a.fallback_audio = null;
        a.fallback_playbackrate = 1;
        a.def_fallback_playbackrate = a.fallback_playbackrate;
        a.fallback_audiopool = [];
        a.msgparameters = null;
        a.timeoutId = null;
        a.OnLoad_callbacks = [];
        a.useTimer = !1;
        a.utterances = [];
        a.userInteractionEvents = ["mousedown", "mouseup", "mousewheel", "keydown"];
        a.fallbackBufferLength = 5;
        a.tstCompiled = function(a) {
            return eval("typeof xy === 'undefined'")
        };
        a.fallbackServicePath = "https://code.responsivevoice.org/" + (a.tstCompiled() ? "" : "develop/") + "getvoice.php";
        a.default_rv = a.responsivevoices[0];
        a.debug = !1;
        a.rvsMapped = !1;
        a.forcedFallbackMode = !1;
        a.speechAllowedByUser = !0;
        a.log = function(b) {
            a.debug && console.log(b)
        };
        a.init = function() {
            a.is_android && (a.useTimer = !0);
            a.is_opera ||
                "undefined" === typeof speechSynthesis ? (console.log("RV: Voice synthesis not supported"), a.enableFallbackMode()) : setTimeout(function() {
                    var b = setInterval(function() {
                        var c = window.speechSynthesis.getVoices();
                        0 != c.length || null != a.systemvoices && 0 != a.systemvoices.length ? (console.log("RV: Voice support ready"), a.systemVoicesReady(c), clearInterval(b)) : (console.log("Voice support NOT ready"), a.voicesupport_attempts++, a.voicesupport_attempts > a.VOICESUPPORT_ATTEMPTLIMIT && (clearInterval(b), null != window.speechSynthesis ?
                            a.iOS ? (a.iOS11 ? a.systemVoicesReady(a.cache_ios11_voices) : a.iOS10 ? a.systemVoicesReady(a.cache_ios10_voices) : a.iOS9 ? a.systemVoicesReady(a.cache_ios9_voices) : a.systemVoicesReady(a.cache_ios_voices), console.log("RV: Voice support ready (cached)")) : (console.log("RV: speechSynthesis present but no system voices found"), a.enableFallbackMode()) : a.enableFallbackMode()))
                    }, 100)
                }, 100);
            (a.iOS || a.is_android || a.is_safari) && a.enableWindowClickHook();
            a.Dispatch("OnLoad")
        };
        a.systemVoicesReady = function(b) {
            a.systemvoices =
                b;
            a.mapRVs();
            null != a.OnVoiceReady && a.OnVoiceReady.call();
            a.Dispatch("OnReady");
            window.hasOwnProperty("dispatchEvent") && window.dispatchEvent(new Event("ResponsiveVoice_OnReady"))
        };
        a.enableFallbackMode = function() {
            a.fallbackMode = !0;
            a.forcedFallbackMode = !0;
            console.log("RV: Enabling fallback mode");
            a.mapRVs();
            null != a.OnVoiceReady && a.OnVoiceReady.call();
            a.Dispatch("OnReady");
            window.hasOwnProperty("dispatchEvent") && window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
            a.Dispatch("OnServiceSwitched")
        };
        a.getVoices = function() {
            for (var b = [], c = 0; c < a.responsivevoices.length; c++) b.push({
                name: a.responsivevoices[c].name
            });
            return b
        };
        a.speak = function(b, c, d) {
            if (a.rvsMapped) {
                var h = null;
                if (a.isPlaying()) a.log("Cancelling previous speech"), a.cancel(), setTimeout(function() {
                    a.speak(b, c, d)
                }, 50);
                else {
                    b = b.replace(/["`]/gm, "'");
                    a.msgparameters = d || {};
                    a.msgtext = b;
                    a.msgvoicename = c;
                    a.onstartFired = !1;
                    var k = [];
                    if (b.length > a.CHARACTER_LIMIT) {
                        for (var f = b; f.length > a.CHARACTER_LIMIT;) {
                            var g = f.search(/([:!\u00a1?\u00bf;\(\)\[\]\u2014\u00ab\u00bb\n]+|\.[^0-9]+)/),
                                e = "";
                            if (-1 == g || g >= a.CHARACTER_LIMIT) g = f.search(/,[^0-9]+/);
                            if (-1 == g || g >= a.CHARACTER_LIMIT) {
                                var l = f.split(" ");
                                for (g = 0; g < l.length; g++) {
                                    if (e.length + l[g].length + 1 > a.CHARACTER_LIMIT) {
                                        l[g].length >= a.CHARACTER_LIMIT && (e += l[g].substr(0, a.CHARACTER_LIMIT - e.length - 1));
                                        break
                                    }
                                    e += (0 != g ? " " : "") + l[g]
                                }
                            } else e = f.substr(0, g + 1);
                            f = f.substr(e.length, f.length - e.length);
                            k.push(e)
                        }
                        0 < f.length && k.push(f)
                    } else k.push(b);
                    console.log(k);
                    a.multipartText = k;
                    null == c ? (g = a.default_rv, a.setDefaultVoice(g.name)) : g = a.getResponsiveVoice(c);
                    !0 === g.deprecated && console.warn("ResponsiveVoice: Voice " + g.name + " is deprecated and will be removed in future releases");
                    f = {};
                    if (null != g.mappedProfile) f = g.mappedProfile;
                    else if (f.systemvoice = a.getMatchedVoice(g), f.collectionvoice = {}, null == f.systemvoice) {
                        console.log("RV: ERROR: No voice found for: " + c);
                        return
                    }
                    if (a.checkSpeechAllowed()) {
                        a.fallbackMode && 0 < a.fallback_audiopool.length && a.clearFallbackPool();
                        a.msgprofile = f;
                        a.log("Voice picked: " + a.msgprofile.systemvoice.name);
                        a.utterances = [];
                        a.fallbackChunks = [];
                        for (g = 0; g < k.length; g++)
                            if (!a.fallbackMode && a.getServiceEnabled(a.services.NATIVE_TTS)) a.log("Using SpeechSynthesis"), h = a.services.NATIVE_TTS, e = new SpeechSynthesisUtterance, e.voiceURI = f.systemvoice.voiceURI, e.volume = a.selectBest([f.collectionvoice.volume, f.systemvoice.volume, 1]), e.rate = a.selectBest([a.iOS9plus ? 1 : null, f.collectionvoice.rate, f.systemvoice.rate, 1]), e.pitch = a.selectBest([f.collectionvoice.pitch, f.systemvoice.pitch, 1]), e.text = k[g], e.lang = a.selectBest([f.collectionvoice.lang, f.systemvoice.lang]),
                                e.rvIndex = g, e.rvTotal = k.length, 0 == g && (e.onstart = a.speech_onstart), a.msgparameters.onendcalled = !1, null != d ? (e.voice = "undefined" !== typeof d.voice ? d.voice : f.systemvoice, g < k.length - 1 && 1 < k.length ? (e.onend = a.onPartEnd, e.hasOwnProperty("addEventListener") && e.addEventListener("end", a.onPartEnd)) : (e.onend = a.speech_onend, e.hasOwnProperty("addEventListener") && e.addEventListener("end", a.speech_onend)), e.onerror = d.onerror || function(b) {
                                        a.log("RV: Unknow Error");
                                        a.log(b)
                                    }, d.rate = a.validateParameters(d, "rate"), d.pitch =
                                    a.validateParameters(d, "pitch"), d.volume = a.validateParameters(d, "volume"), e.onpause = d.onpause, e.onresume = d.onresume, e.onmark = d.onmark, e.onboundary = d.onboundary || a.onboundary, e.pitch = null != d.pitch ? d.pitch : e.pitch, e.rate = a.iOS ? (null != d.rate ? d.rate * d.rate : 1) * e.rate : (null != d.rate ? d.rate : 1) * e.rate, e.volume = null != d.volume ? d.volume : e.volume) : (a.log("No Params received for current Utterance"), e.voice = f.systemvoice, e.onend = a.speech_onend, e.onboundary = a.onboundary, e.onerror = function(b) {
                                    a.log("RV: Unknow Error");
                                    a.log(b)
                                }), a.utterances.push(e), 0 == g && (a.currentMsg = e), console.log(e), a.tts_speak(e);
                            else if (a.fallbackMode && a.getServiceEnabled(a.services.FALLBACK_AUDIO)) {
                            h = a.services.FALLBACK_AUDIO;
                            a.fallback_playbackrate = a.def_fallback_playbackrate;
                            e = a.selectBest([f.collectionvoice.pitch, f.systemvoice.pitch, 1]);
                            l = a.selectBest([a.iOS9plus ? 1 : null, f.collectionvoice.rate, f.systemvoice.rate, 1]);
                            var m = a.selectBest([f.collectionvoice.volume, f.systemvoice.volume, 1]);
                            if (null != d) {
                                e *= null != d.pitch ? d.pitch : 1;
                                l *= null != d.rate ?
                                    d.rate : 1;
                                m *= null != d.volume ? d.volume : 1;
                                var n = d.extraParams || null
                            }
                            e /= 2;
                            l /= 2;
                            m *= 2;
                            e = Math.min(Math.max(e, 0), 1);
                            l = Math.min(Math.max(l, 0), 1);
                            m = Math.min(Math.max(m, 0), 1);
                            e = a.fallbackServicePath + "?t=" + encodeURIComponent(k[g]) + "&tl=" + (f.collectionvoice.lang || f.systemvoice.lang || "en-US") + "&sv=" + (f.collectionvoice.service || f.systemvoice.service || "") + "&vn=" + (f.collectionvoice.voicename || f.systemvoice.voicename || "") + "&pitch=" + e.toString() + "&rate=" + l.toString() + "&vol=" + m.toString();
                            void 0 !== f.collectionvoice.gender &&
                                (e += "&gender=" + f.collectionvoice.gender);
                            n && (e += "&extraParams=" + JSON.stringify(n));
                            a.fallbackChunks.push({
                                text: k[g],
                                url: e,
                                audio: null
                            })
                        }
                        a.fallbackMode && a.getServiceEnabled(a.services.FALLBACK_AUDIO) && (a.fallbackChunkIndex = 0, a.fallback_startPart());
                        a.log("Service used: " + h)
                    } else a.scheduledSpeak = {
                        text: b,
                        voicename: c,
                        parameters: d
                    }
                }
            } else setTimeout(function() {
                a.speak(b, c, d)
            }, 15)
        };
        a.startTimeout = function(b, c) {
            var d = a.msgprofile.collectionvoice.timerSpeed;
            null == a.msgprofile.collectionvoice.timerSpeed && (d =
                1);
            0 >= d || (a.timeoutId = setTimeout(c, a.getEstimatedTimeLength(b, d)), a.log("Timeout ID: " + a.timeoutId))
        };
        a.checkAndCancelTimeout = function() {
            null != a.timeoutId && (clearTimeout(a.timeoutId), a.timeoutId = null)
        };
        a.speech_timedout = function() {
            a.cancel();
            a.cancelled = !1;
            a.speech_onend()
        };
        a.speech_onend = function() {
            a.checkAndCancelTimeout();
            !0 === a.cancelled ? a.cancelled = !1 : (a.log("on end fired"), null != a.msgparameters && null != a.msgparameters.onend && 1 != a.msgparameters.onendcalled && (a.log("Speech on end called  -" + a.msgtext),
                a.msgparameters.onendcalled = !0, a.msgparameters.onend()))
        };
        a.speech_onstart = function() {
            if (!a.onstartFired) {
                a.onstartFired = !0;
                a.log("Speech start");
                if (a.iOS || a.is_safari || a.useTimer) a.fallbackMode || a.startTimeout(a.msgtext, a.speech_timedout);
                a.msgparameters.onendcalled = !1;
                if (null != a.msgparameters && null != a.msgparameters.onstart) a.msgparameters.onstart()
            }
        };
        a.fallback_startPart = function() {
            0 == a.fallbackChunkIndex && a.speech_onstart();
            a.fallback_updateChunksBuffer();
            a.fallback_audio = a.fallbackChunks[a.fallbackChunkIndex].audio;
            null == a.fallback_audio ? a.log("RV: Fallback Audio is not available") : (function() {
                var b = a.fallback_audio;
                setTimeout(function() {
                    b.playbackRate = a.fallback_playbackrate
                }, 50);
                b.onloadedmetadata = function() {
                    b.playbackRate = a.fallback_playbackrate
                };
                if (2 <= b.readyState) b.play();
                else {
                    var c = function() {
                        b.play();
                        b.removeEventListener("canplaythrough", c)
                    };
                    b.addEventListener("canplaythrough", c, !1)
                }
            }(), a.fallback_errors && (a.log("RV: Speech cancelled due to errors"), a.speech_onend()), a.fallback_audio.addEventListener("ended",
                a.fallback_finishPart), a.useTimer && a.startTimeout(a.multipartText[a.fallbackChunkIndex], a.fallback_finishPart))
        };
        a.isFallbackAudioPlaying = function() {
            var b;
            for (b = 0; b < a.fallback_audiopool.length; b++) {
                var c = a.fallback_audiopool[b];
                if (!c.paused && !c.ended && c.currentTime != c.duration) return !0
            }
            return !1
        };
        a.fallback_finishPart = function(b) {
            a.isFallbackAudioPlaying() ? (a.checkAndCancelTimeout(), a.timeoutId = setTimeout(a.fallback_finishPart, 1E3 * (a.fallback_audio.duration - a.fallback_audio.currentTime))) : (a.checkAndCancelTimeout(),
                a.fallbackChunkIndex < a.fallbackChunks.length - 1 ? (a.fallbackChunkIndex++, a.fallback_startPart()) : a.speech_onend())
        };
        a.cancel = function() {
            a.checkAndCancelTimeout();
            a.fallbackMode ? (null != a.fallback_audio && a.fallback_audio.pause(), a.clearFallbackPool()) : (a.cancelled = !0, speechSynthesis.cancel())
        };
        a.voiceSupport = function() {
            return "speechSynthesis" in window
        };
        a.OnFinishedPlaying = function(b) {
            if (null != a.msgparameters && null != a.msgparameters.onend) a.msgparameters.onend()
        };
        a.setDefaultVoice = function(b) {
            if (a.rvsMapped) {
                var c =
                    a.getResponsiveVoice(b);
                null != c && (a.default_rv = c)
            } else setTimeout(function() {
                a.setDefaultVoice(b)
            }, 15)
        };
        a.mapRVs = function() {
            if ("object" == typeof navigator) {
                var b, c = "anguage";
                var d = navigator;
                d = (b = d["l" + c + "s"], b && b.length ? b : (c = d["l" + c] || d["browserL" + c] || d["userL" + c]) ? [c] : c)
            } else d = void 0;
            b = d[0];
            for (c = 0; c < a.responsivevoices.length; c++) {
                d = a.responsivevoices[c];
                for (var h = 0; h < d.voiceIDs.length; h++) {
                    var k = a.voicecollection[d.voiceIDs[h]];
                    if (1 != k.fallbackvoice) {
                        var f = a.getSystemVoice(k.name);
                        a.forcedFallbackMode &&
                            (f = null);
                        a.iOS12_0 && d.lang.toLowerCase() != b.toLowerCase() && d.lang.toLowerCase().split("-")[0] != b.toLowerCase() && (f = null);
                        if (null != f) {
                            d.mappedProfile = {
                                systemvoice: f,
                                collectionvoice: k
                            };
                            break
                        }
                    } else {
                        d.mappedProfile = {
                            systemvoice: {},
                            collectionvoice: k
                        };
                        break
                    }
                }
            }
            a.rvsMapped = !0
        };
        a.getMatchedVoice = function(b) {
            for (var c = 0; c < b.voiceIDs.length; c++) {
                var d = a.getSystemVoice(a.voicecollection[b.voiceIDs[c]].name);
                if (null != d) return d
            }
            return null
        };
        a.getSystemVoice = function(b) {
            var c = String.fromCharCode(160);
            var d = b.replace(new RegExp("\\s+|" +
                c, "g"), "");
            if ("undefined" === typeof a.systemvoices || null === a.systemvoices) return null;
            for (var h = 0; h < a.systemvoices.length; h++)
                if (0 === a.systemvoices[h].name.localeCompare(b) || 0 === a.systemvoices[h].name.replace(new RegExp("\\s+|" + c, "g"), "").replace(/ *\([^)]*\) */g, "").localeCompare(d)) return a.systemvoices[h];
            return null
        };
        a.getResponsiveVoice = function(b) {
            for (var c = 0; c < a.responsivevoices.length; c++)
                if (a.responsivevoices[c].name == b) return b = a.fallbackMode, a.fallbackMode = !0 === a.responsivevoices[c].mappedProfile.collectionvoice.fallbackvoice ||
                    !0 === a.forcedFallbackMode ? !0 : !1, b != a.fallbackMode && (a.mapRVs(), a.Dispatch("OnServiceSwitched")), a.responsivevoices[c];
            return null
        };
        a.Dispatch = function(b) {
            if (a.hasOwnProperty(b + "_callbacks") && null != a[b + "_callbacks"] && 0 < a[b + "_callbacks"].length) {
                for (var c = a[b + "_callbacks"], d = 0; d < c.length; d++) c[d]();
                return !0
            }
            var h = b + "_callbacks_timeout",
                k = b + "_callbacks_timeoutCount";
            a.hasOwnProperty(h) || (a[k] = 10, a[h] = setInterval(function() {
                --a[k];
                (a.Dispatch(b) || 0 > a[k]) && clearTimeout(a[h])
            }, 50));
            return !1
        };
        a.AddEventListener =
            function(b, c) {
                a.hasOwnProperty(b + "_callbacks") || (a[b + "_callbacks"] = []);
                a[b + "_callbacks"].push(c)
            };
        a.addEventListener = a.AddEventListener;
        a.RemoveEventListener = function(b, c) {
            a[b + "_callbacks"] && -1 != a[b + "_callbacks"].indexOf(c) && a[b + "_callbacks"].splice(a[b + "_callbacks"].indexOf(c), 1)
        };
        a.clickEvent = function() {
            a.log("Click event");
            a.click_event_detected = !0;
            a.initializePermissions();
            a.userInteractionEvents.forEach(function(b) {
                window.removeEventListener(b, a.clickEvent, !1)
            });
            a.Dispatch("OnClickEvent")
        };
        a.initializePermissions =
            function() {
                if (a.iOS && !a.iOS_initialized) {
                    a.log("Initializing iOS click event");
                    var b = new SpeechSynthesisUtterance(" ");
                    speechSynthesis.speak(b);
                    a.iOS_initialized = !0
                }
                a.is_android && !a.android_initialized && (a.log("Initializing Android click event"), b = new SpeechSynthesisUtterance(" "), speechSynthesis.speak(b));
                a.initFallbackPool()
            };
        a.isPlaying = function() {
            return a.fallbackMode ? null != a.fallback_audio && !a.fallback_audio.ended && !a.fallback_audio.paused : speechSynthesis.speaking
        };
        a.clearFallbackPool = function() {
            for (var b =
                    0; b < a.fallback_audiopool.length; b++) null != a.fallback_audiopool[b] && (a.fallback_audiopool[b].pause(), a.fallback_audiopool[b].src = "");
            a.fallback_audiopool_index = 0;
            a.fallbackChunks = []
        };
        a.initFallbackPool = function() {
            if (!a.fallback_audiopool || 0 == a.fallback_audiopool.length) {
                for (var b = 0; 10 > b; b++) {
                    var c = b,
                        d = document.createElement("AUDIO");
                    d.preload = "auto";
                    a.is_android && (d.src = "", d.load(), 9 == c && (a.log("Android HTML audio initialized"), a.android_initialized = !0));
                    a.iOS && (d.src = "", d.load(), 9 == c && (a.log("iOS HTML audio initialized"),
                        a.iOS_initialized = !0));
                    a.fallback_audiopool.push(d)
                }
                a.fallback_audiopool_index = 0
            }
        };
        a.allowSpeechClicked = function(b) {
            a.allowSpeechDiv.parentNode.removeChild(a.allowSpeechDiv);
            a.allowSpeechDiv = null;
            if (a.speechAllowedByUser = b) a.clickEvent(), a.scheduledSpeak && (a.speak(a.scheduledSpeak.text, a.scheduledSpeak.voicename, a.scheduledSpeak.parameters), a.scheduledSpeak = null);
            a.Dispatch("OnAllowSpeechClicked")
        };
        a.checkSpeechAllowed = function(b) {
            if (0 == a.speechAllowedByUser) return !1;
            if ((a.is_android || a.iOS || a.is_safari &&
                    (a.fallbackMode || a.forcedFallbackMode)) && !a.click_event_detected) {
                if (a.allowSpeechDiv) return;
                a.allowSpeechDiv_appearances = null == a.allowSpeechDiv_appearances ? 1 : ++a.allowSpeechDiv_appearances;
                if (2 < a.allowSpeechDiv_appearances) return console.log("ResponsiveVoice: Speech not allowed by user"), !1;
                var c = document.createElement("style");
                c.innerHTML = '.rvNotification{position:fixed;background-color:#fff;text-align:center;font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:400;line-height:1.5;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);z-index:10000;width:100vw;left:0;bottom:0;font-size:1rem;padding-bottom:.5em;padding-right:.5em}.rvButtonRow{padding-right:2em;padding-bottom:1em;text-align:right;font-size:medium}.rvButton{cursor:pointer;display:inline-block;margin-left:1em;padding:.8em 2em;border-radius:3px;font-size:small}.rvButtonAllow{border:none;background-color:#2b8cff;color:#fff}.rvButtonDeny{border:1px solid #2b8cff;color:#2b8cff;background-color:#fff}.rvTextRow{padding-top:1em;padding-bottom:2em}@media (min-width:576px){.rvNotification{width:60vw;left:20vw}}@media (min-width:768px){.rvNotification{width:50vw;left:25vw}}@media (min-width:992px){.rvNotification{width:40vw;left:30vw}}@media (min-width:1200px){.rvNotification{width:30vw;left:35vw}}';
                document.body.appendChild(c);
                a.allowSpeechDiv = document.createElement("div");
                a.allowSpeechDiv.classList.add("rvNotification");
                void 0 == b && (b = {});
                a.allowSpeechDiv.innerHTML = '<div class="rvTextRow"><strong>' + (void 0 != b.urlOverride ? b.urlOverride : window.location.hostname) + "</strong> " + (void 0 != b.textOverride ? b.textOverride : "wants to play speech") + '</div><div class="rvButtonRow"><div onclick="responsiveVoice.allowSpeechClicked(false);" class="rvButton rvButtonDeny">DENY</div><div onclick="responsiveVoice.allowSpeechClicked(true);" class="rvButton rvButtonAllow">ALLOW</div></div>';
                document.body.appendChild(a.allowSpeechDiv);
                return !1
            }
            return !0
        };
        a.fallback_audioPool_getAudio = function() {
            a.initFallbackPool();
            a.fallback_audiopool_index >= a.fallback_audiopool.length && (a.fallback_audiopool_index = 0);
            return a.fallback_audiopool[a.fallback_audiopool_index++]
        };
        a.fallback_updateChunksBuffer = function() {
            for (var b = a.fallbackChunkIndex; b < Math.min(a.fallbackChunks.length, a.fallbackChunkIndex + a.fallbackBufferLength); b++) {
                var c = a.fallbackChunks[b];
                null == c.audio && (c.audio = a.fallback_audioPool_getAudio(),
                    c.audio.src = c.url, c.audio.playbackRate = a.fallback_playbackrate, c.audio.preload = "auto", c.audio.load())
            }
        };
        a.selectBest = function(a) {
            for (var b = 0; b < a.length; b++)
                if (null != a[b]) return a[b];
            return null
        };
        a.pause = function() {
            a.fallbackMode ? null != a.fallback_audio && a.fallback_audio.pause() : speechSynthesis.pause()
        };
        a.resume = function() {
            a.fallbackMode ? null != a.fallback_audio && a.fallback_audio.play() : speechSynthesis.resume()
        };
        a.tts_speak = function(b) {
            setTimeout(function() {
                a.cancelled = !1;
                speechSynthesis.speak(b)
            }, .01)
        };
        a.setVolume = function(b) {
            if (a.isPlaying())
                if (a.fallbackMode) {
                    for (var c = 0; c < a.fallback_audiopool.length; c++) a.fallback_audiopool[c].volume = b;
                    a.fallback_audio.volume = b
                } else
                    for (c = 0; c < a.utterances.length; c++) a.utterances[c].volume = b
        };
        a.onPartEnd = function(b) {
            if (null != a.msgparameters && null != a.msgparameters.onchuckend) a.msgparameters.onchuckend();
            a.Dispatch("OnPartEnd");
            b = a.utterances.indexOf(b.utterance);
            a.currentMsg = a.utterances[b + 1]
        };
        a.onboundary = function(b) {
            a.log("On Boundary");
            a.iOS && !a.onstartFired &&
                a.speech_onstart()
        };
        a.numToWords = function(b) {
            function c(a) {
                if (Array.isArray(a)) {
                    for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b];
                    return c
                }
                return Array.from(a)
            }
            var d = function() {
                    return function(a, b) {
                        if (Array.isArray(a)) return a;
                        if (Symbol.iterator in Object(a)) {
                            var c = [],
                                d = !0,
                                e = !1,
                                f = void 0;
                            try {
                                for (var g = a[Symbol.iterator](), h; !(d = (h = g.next()).done) && (c.push(h.value), !b || c.length !== b); d = !0);
                            } catch (r) {
                                e = !0, f = r
                            } finally {
                                try {
                                    if (!d && g["return"]) g["return"]()
                                } finally {
                                    if (e) throw f;
                                }
                            }
                            return c
                        }
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                }(),
                h = function(a) {
                    return 0 === a.length
                },
                k = function(a) {
                    return function(b) {
                        return b.slice(0, a)
                    }
                },
                f = function(a) {
                    return function(b) {
                        return b.slice(a)
                    }
                },
                g = function(a) {
                    return a.slice(0).reverse()
                },
                e = function(a) {
                    return function(b) {
                        return function(c) {
                            return a(b(c))
                        }
                    }
                },
                l = function(a) {
                    return !a
                },
                m = function q(a) {
                    return function(b) {
                        return h(b) ? [] : [k(a)(b)].concat(c(q(a)(f(a)(b))))
                    }
                },
                n = " one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" "),
                p = "  twenty thirty forty fifty sixty seventy eighty ninety".split(" "),
                t = " thousand million billion trillion quadrillion quintillion sextillion septillion octillion nonillion".split(" "),
                u = function(a) {
                    var b = d(a, 3);
                    a = b[0];
                    var c = b[1];
                    b = b[2];
                    return [0 === (Number(b) || 0) ? "" : n[b] + " hundred ", 0 === (Number(a) || 0) ? p[c] : p[c] && p[c] + " " || "", n[c + a] || n[a]].join("")
                },
                v = function(a, b) {
                    return "" === a ? a : a + " " + t[b]
                };
            return "number" === typeof b ? a.numToWords(String(b)) : "0" === b ? "zero" : e(m(3))(g)(Array.from(b)).map(u).map(v).filter(e(l)(h)).reverse().join(" ").trim()
        };
        a.getWords = function(b) {
            b = b.replace(/$|\u00a5|\u20a1|\u20ac|\u00a3|\u20aa|\u20b9|\uffe5|\u17db|\u20a9|\u20a6|\u0e3f|\u20b4|\u20ab/gi, " dummy currency ");
            var c = b.split(/(\s*[\s,]\s*|\?|;|:|\.|\(|\)|!)/);
            c = c.filter(function(a) {
                return /[^\s]/.test(a)
            });
            for (var d = 0; d < c.length; d++) null != (b = c[d].toString().match(/\d+/)) && (c.splice(d, 1), a.numToWords(+b[0]).split(/\s+/).map(function(a) {
                c.push(a)
            }));
            return c
        };
        a.getEstimatedTimeLength = function(b, c) {
            var d = a.getWords(b),
                h = 0,
                k = a.fallbackMode ? 1300 : 700;
            c = c || 1;
            d.map(function(a,
                b) {
                h += (a.toString().match(/[^ ]/igm) || a).length
            });
            var f = d.length,
                g = 60 / a.WORDS_PER_MINUTE * c * 1E3 * f;
            5 > f && (g = c * (k + 50 * h));
            a.log("Estimated time length: " + g + " ms, words: [" + d + "], charsCount: " + h);
            return g
        };
        a.validateParameters = function(a, c) {
            if ("undefined" === typeof a[c]) return a[c];
            switch (c) {
                case "rate":
                case "pitch":
                case "volume":
                    var b = Number(a[c]);
                    isNaN(b) && console.warn("ResponsiveVoice: the parameter " + c + ' has a wrong value "' + a[c] + '". Defaults were used.');
                    a[c] = isNaN(b) ? "1" : a[c]
            }
            return a[c]
        };
        a.services = {
            NATIVE_TTS: 0,
            FALLBACK_AUDIO: 1
        };
        a.servicesPriority = [0, 1];
        a.servicesEnabled = [];
        a.setServiceEnabled = function(b, c) {
            a.servicesEnabled[b] = c
        };
        a.getServiceEnabled = function(b) {
            return a.servicesEnabled[b] || !1
        };
        a.setServiceEnabled(a.services.NATIVE_TTS, !0);
        a.setServiceEnabled(a.services.FALLBACK_AUDIO, !0);
        a.forceFallbackMode = function(b) {
            a.forcedFallbackMode = b;
            a.fallbackMode = b;
            a.mapRVs();
            a.Dispatch("OnServiceSwitched")
        };
        a.enableWindowClickHook = function() {
            a.userInteractionEvents.forEach(function(b) {
                window.addEventListener(b,
                    a.clickEvent, !1)
            })
        };
        "interactive" === document.readyState ? a.init() : document.addEventListener("DOMContentLoaded", function() {
            a.init()
        })
    },
responsiveVoice = new ResponsiveVoice;

export default responsiveVoice;