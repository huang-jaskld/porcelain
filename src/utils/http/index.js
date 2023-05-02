const orignFetch = window.fetch;

const basicUrl = "http://a7impd.natappfree.cc";

const basicConfig = {
  caches: "force-cache", // 缓存优先，只有不存在缓存的情况下，才请求远程服务器
  mode: "cors", // 默认值，允许跨域请求
  // credentials: "include", //不管同源请求，还是跨域请求，一律发送 Cookie
  keepalive: true, // keepalive: true
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  // referrerPolicy: "no-referrer",
};

const request = async (url, method, data = {}, type) => {
  let response;
  let newUrl = basicUrl + url;
  switch (method) {
    case "get":
      return await orignFetch(newUrl, basicConfig);
    case "post":
      response = await orignFetch(newUrl, {
        ...basicConfig,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        data: JSON.stringify(data),
      });
      return await response.json();
  }
};

const get = async (url, type = "json") => {
  return await request(url, "get", type);
};
const post = async (url, data, type = "json") =>
  await request(url, "post", data, type);

export { get, post };
