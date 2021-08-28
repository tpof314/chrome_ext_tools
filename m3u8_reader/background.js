// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var global_m3u8_link = "";

function is_m3u8_link(url) {
  if (url.indexOf('.m3u8') > 5) {
    return true;
  }
  else {
    return false;
  }
}

function print_info(tab) {
  console.log(global_m3u8_link);
  console.log(tab.title);
}

function pass_to_server(url, title) {
  var payload = {
      "video_url": url,
      "title": title
  };

  fetch('https://ofhnindco6.execute-api.ap-southeast-2.amazonaws.com/video_pub', {
      method: 'POST',
      headers: {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: new URLSearchParams(payload)
  }).then(resp => console.log(resp));
}

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    if (is_m3u8_link(info.url)) {
      global_m3u8_link = info.url;
    }
    // return {requestHeaders: details.requestHeaders};
  },
  // filters
  {urls: ['https://*/*', 'http://*/*']},
  // extraInfoSpec
  []);

chrome.browserAction.onClicked.addListener((tab) => {
  print_info(tab);
  pass_to_server(global_m3u8_link, tab.title)
});
