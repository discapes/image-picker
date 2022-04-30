
const SERVER = "http://127.0.0.1:3000";
export function url(path, params = {}) {
    return SERVER + "/" + path + "?" + new URLSearchParams(params).toString();
}