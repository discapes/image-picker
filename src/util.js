export function url(path, params = {}) {
    if (path === "get") {
        return "/pics/" + params.filename;
    } else {
        throw Error();
    }
}