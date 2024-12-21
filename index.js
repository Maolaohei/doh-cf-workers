// SPDX-License-Identifier: 0BSD
const DOH_ENDPOINT = 'https://security.cloudflare-dns.com/dns-query'
const CONTENT_TYPE_DNS = 'application/dns-message'
const CONTENT_TYPE_JSON = 'application/dns-json'
const PATH_PREFIX = '' // default allow all, must start with '/' if specified, eg. "/dns-query"
const AUTH_TOKEN = 'your-secret-token-here'
export default {
    async fetch(request, env, ctx) {
        return handleRequest(request)
    },
}

function validateAuth(url) {
    const { searchParams } = new URL(url)
    return searchParams.get('token') === AUTH_TOKEN
}

async function handleRequest(request) {
    // 首先验证请求
    if (!validateAuth(request.url)) {
        return new Response('Unauthorized', {status: 403})
    }

    const { method, headers, url } = request
    const {searchParams, pathname} = new URL(url)
    
    // Check path
    if (!pathname.startsWith(PATH_PREFIX)) {
        return new Response(null, {status: 404})
    }
    
    // 创建新的 URL，移除验证 token
    const cleanUrl = new URL(url)
    cleanUrl.searchParams.delete('token')
    const cleanSearch = cleanUrl.search
    
    if (method === 'GET' && searchParams.has('dns')) {
        return fetch(`${DOH_ENDPOINT}?dns=${searchParams.get('dns')}`, {
            method: 'GET',
            headers: {
                'Accept': CONTENT_TYPE_DNS,
            }
        })
    } else if (method === 'POST' && headers.get('content-type') === CONTENT_TYPE_DNS) {
        return fetch(DOH_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': CONTENT_TYPE_DNS,
                'Content-Type': CONTENT_TYPE_DNS,
            },
            body: request.body,
        })
    } else if (method === 'GET' && headers.get('Accept') === CONTENT_TYPE_JSON) {
        return fetch(DOH_ENDPOINT + cleanSearch, {
            method: 'GET',
            headers: {
                'Accept': CONTENT_TYPE_JSON,
            }
        })
    }
    
    return new Response(null, {status: 404})
}
