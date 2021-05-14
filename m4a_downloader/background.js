// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var global_m4a_link = "";
// https://res.wx.qq.com/voice/getvoice?mediaid=MzU3MTcxNjI4OV8yMjQ3NDg4MDI1
function is_m4a_link(url) {
  if (url.indexOf('.m4a') > 5 || url.indexOf('.mp3') > 5) {
    return true;
  }
  else {
    return false;
  }
}

function print_info(tab) {
  console.log(global_m4a_link);
  console.log(tab.title);
}

function download_file(url, title) {
  chrome.downloads.download({
    url: url, 
    filename: title + ".m4a"
  })
}

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if (is_m4a_link(info.url)) {
      global_m4a_link = info.url;
    }
    else if (info.type == "media") {
      global_m4a_link = info.url;
    }
    // return {requestHeaders: details.requestHeaders};
  },
  // filters
  {urls: ['https://*/*', 'http://*/*']},
  // extraInfoSpec
  []);

chrome.browserAction.onClicked.addListener((tab) => {
  print_info(tab);
  download_file(global_m4a_link, tab.title);
  // chrome.downloads.download({
  //   url: global_m4a_link, 
  //   filename: "1.m4a"
  // })
});