// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var global_m4a_link = "";

function print_info(tab) {
  console.log(global_m4a_link);
  console.log(tab.title);
}

function update_title(title) {
  var result = title.replace("正在播放:", "");
  result = result.replace(":", "_");
  result = result.replace("?", "_");
  result = result.replace(" ", "_");
  result = result.replace("(", "_");
  result = result.replace(")", "_");
  result = result.replace("|", "_");
  result = result.replace("-", "_");
  result = result.substr(0, 30);
  return result;
}

function download_file(url, title) {
  chrome.downloads.download({
    url: url, 
    filename: update_title(title) + ".m4a"
  })
}

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if (info.type == "media") {
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
});