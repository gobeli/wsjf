export function request({ url, method, body }) {
  return fetch(url, { 
    method, 
    body,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
}